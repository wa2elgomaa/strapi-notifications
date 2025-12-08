import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { memo, useState, useEffect } from "react";
import { Information, ArrowRight, PaperPlane, Pencil } from "@strapi/icons";
import { Box, Field, Tooltip, Button, Typography, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Pagination, PreviousLink, PageLink, Dots, NextLink, Grid, Alert } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { P as PLUGIN_ID } from "./index-Bbtw3smv.mjs";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const HomePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [payload, setPayload] = useState("");
  const [image, setImage] = useState("");
  const handleEntry = (event) => {
    event.preventDefault();
    console.log("You have submitted the form.");
    if (title.trim().length !== 0) {
      const entry = {
        title,
        body,
        payload,
        image
      };
      localStorage.setItem("fcmLastNotification", JSON.stringify(entry));
      navigate(pathname + "/targets");
    } else {
      alert(formatMessage({ id: getTranslation("Please enter a title") }));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleEntry, children: [
    /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsxs(Field.Root, { children: [
      /* @__PURE__ */ jsx(Field.Label, { children: "Title" }),
      /* @__PURE__ */ jsx(
        Field.Input,
        {
          placeholder: "Enter notification title",
          title: "Title",
          name: "title",
          hasError: !!title.length,
          "aria-errormessage": title.length < 1 ? "Title is a required field." : void 0,
          onChange: (e) => setTitle(e.target.value),
          value: title,
          endAction: /* @__PURE__ */ jsx(Tooltip, { title: "Shown to end users as the notification title", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Information about the title",
              style: {
                border: "none",
                padding: 0,
                background: "transparent"
              },
              children: /* @__PURE__ */ jsx(Information, { "aria-hidden": true })
            }
          ) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsxs(Field.Root, { children: [
      /* @__PURE__ */ jsx(Field.Label, { children: "Body (optional)" }),
      /* @__PURE__ */ jsx(
        Field.Input,
        {
          placeholder: "Enter notification text",
          name: "body",
          onChange: (e) => setBody(e.target.value),
          value: body
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsxs(Field.Root, { children: [
      /* @__PURE__ */ jsx(Field.Label, { children: "Image (Optional)" }),
      /* @__PURE__ */ jsx(
        Field.Input,
        {
          placeholder: "Enter notification image url",
          name: "image",
          onChange: (e) => setImage(e.target.value),
          value: image,
          endAction: /* @__PURE__ */ jsx(Tooltip, { title: "Optionally provide a valid HTTPS image URL", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Information about the image",
              style: {
                border: "none",
                padding: 0,
                background: "transparent"
              },
              children: /* @__PURE__ */ jsx(Information, { "aria-hidden": true })
            }
          ) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsxs("details", { children: [
      /* @__PURE__ */ jsx("summary", { style: { cursor: "pointer", paddingBottom: "1em" }, children: "Extra payload" }),
      /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsxs(Field.Root, { children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Extra Payload (Optional)" }),
        /* @__PURE__ */ jsx(
          Field.Input,
          {
            placeholder: 'Enter extra payload json {"notification", "data"}',
            name: "payload",
            onChange: (e) => setPayload(e.target.value),
            value: payload
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", endIcon: /* @__PURE__ */ jsx(ArrowRight, {}), children: "Next" }) })
  ] });
};
const HomePage$1 = memo(HomePage);
const TargetsPage = (props) => {
  const navigate = useNavigate();
  const { get, post } = useFetchClient();
  let entry = props?.location?.state;
  if (!entry) {
    entry = JSON.parse(localStorage.getItem("fcmLastNotification") || "{}");
  }
  if (!entry) {
    navigate(-1);
  }
  const defaultPageSize = 20;
  const [page, setPage] = useState(1);
  const [allTargets, setAllTargets] = useState([]);
  const [targets, setTargets] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [targetsCheckedState, setTargetsCheckedState] = useState({
    unchecked: true
  });
  const [paginationInfo, setPaginationInfo] = useState({});
  const [alertToShow, setAlertToShow] = useState(null);
  const fetchTargets = async (page2, pageSize = defaultPageSize) => {
    setFetching(true);
    let items = paginate(page2, pageSize);
    if (items && items.length > 0) {
      setTargets(items);
      setFetching(false);
    } else {
      const { data: targetsResponse } = await get(`${PLUGIN_ID}/fcm-targets`, {
        params: {
          pagination: {
            page: page2,
            pageSize
          },
          populate: "*",
          status: "published",
          filters: {
            disabled: {
              $eq: false
            }
          }
        }
      });
      items = targetsResponse.data;
      console.log("items", items);
      if (!paginationInfo && targetsResponse.pagination && targetsResponse.pagination.pageCount > 0) {
        console.log("res.pagination", targetsResponse.pagination);
        setPaginationInfo(targetsResponse.pagination);
      }
      if (items && items.length > 0) {
        insertTargetsAtOffset(items, (page2 - 1) * pageSize);
        setTargets(items);
        setFetching(false);
        setPage(page2 + 1);
      }
    }
  };
  useEffect(() => {
    fetchTargets(1);
  }, []);
  const toggleCheckTarget = (target) => {
    let selected = selectedTargets || [];
    const index = selected.indexOf(target);
    index >= 0 ? selected.splice(index, 1) : selected.push(target);
    if (selected.length >= allTargets.length && selected.length !== 0) {
      setTargetsCheckedState({ checked: true });
    } else if (selected.length === 0) {
      setTargetsCheckedState({ unchecked: true });
    } else {
      setTargetsCheckedState({ indeterminate: true });
    }
    setSelectedTargets(selected);
  };
  const toggleCheckAllTargets = () => {
    let selected = selectedTargets || [];
    if (selected.length > 0) {
      setSelectedTargets([]);
      setTargetsCheckedState({ unchecked: true });
    } else {
      setSelectedTargets(allTargets ? [...allTargets] : []);
      setTargetsCheckedState({ checked: true });
    }
  };
  const isTargetChecked = (target) => {
    return (selectedTargets || []).indexOf(target) > -1;
  };
  const paginate = (page2, pageSize = defaultPageSize) => {
    const all = allTargets || [];
    return all.slice((page2 - 1) * pageSize, page2 * pageSize);
  };
  const insertTargetsAtOffset = (items, offset) => {
    const all = allTargets ? [...allTargets] : [];
    all.splice(offset, items.length, ...items);
    setAllTargets(all);
  };
  const range = (size, startAt = 0) => {
    return [...Array(size).keys()].map((i) => i + startAt);
  };
  const startPartPagination = () => {
    const size = paginationInfo?.pageCount || 1;
    if (size < 7) {
      return range(size);
    } else if (page <= 2) {
      return range(4);
    } else {
      return [0];
    }
  };
  const middlePartPagination = () => {
    const size = paginationInfo?.pageCount || 1;
    if (size >= 7) {
      if (page >= 3 && page < size - 3) {
        return range(3, page - 1);
      }
    }
    return void 0;
  };
  const endPartPagination = () => {
    const size = paginationInfo?.pageCount || 1;
    if (size > 5) {
      if (page > 3 && page >= size - 3) {
        return range(4, size - 4);
      } else {
        return [size - 1];
      }
    }
    return void 0;
  };
  const sendToSelected = async () => {
    const selected = selectedTargets || [];
    if (selected.length < 1) {
      setAlertToShow({
        title: "Error",
        message: "One or more targets should be selected to send the fcm message.",
        variant: "danger"
      });
      return;
    }
    console.log("selected", selected);
    const typesValues = selected.reduce((p, n) => {
      console.log("p", p, "n", n, n.type === "token", n.type === "topic");
      if (n.type === "token") {
        p.tokens = p.tokens || [];
        p.tokens.push(n.name);
      } else if (n.type === "topic") {
        p.topics = p.topics || [];
        p.topics.push(n.name);
      }
      return p;
    }, {});
    const payload = {
      title: entry.title,
      body: entry.body,
      image: entry.image,
      payload: entry.payload
    };
    const entries = [];
    if (typesValues.tokens?.length > 0) {
      entries.push({
        ...payload,
        ...{ targetType: "tokens", target: typesValues.tokens.join(",") }
      });
    }
    if (typesValues.topics?.length > 0) {
      entries.push({
        ...payload,
        ...{ targetType: "topics", target: typesValues.topics.join(",") }
      });
    }
    try {
      await post(`${PLUGIN_ID}/fcm-notifications?status=published`, {
        data: entries
      });
      setAlertToShow({
        title: "Sent",
        message: "FCM sent successfully.",
        variant: "success"
      });
    } catch (err) {
      setAlertToShow({
        title: "Error",
        message: "Failed to send to FCM. " + JSON.stringify(err || {}),
        variant: "danger"
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    fetching && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Loading..." }) }),
    targets && targets.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Table, { colCount: 5, rowCount: 20, children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              onClick: () => toggleCheckAllTargets(),
              ...targetsCheckedState
            }
          ) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "#" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Label" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Type" }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Target" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: targets.map((target, idx) => {
          return /* @__PURE__ */ jsxs(Tr, { children: [
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
              Checkbox,
              {
                onClick: () => toggleCheckTarget(target),
                checked: isTargetChecked(target)
              }
            ) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: idx + 1 }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: target.label }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: target.type }) }),
            /* @__PURE__ */ jsx(Td, { style: { position: "relative" }, children: /* @__PURE__ */ jsx(
              Typography,
              {
                style: {
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  maxWidth: "250px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                textColor: "neutral800",
                children: target.name
              }
            ) })
          ] }, target.name);
        }) })
      ] }),
      /* @__PURE__ */ jsx(Box, { marginTop: 2, children: /* @__PURE__ */ jsxs(
        Pagination,
        {
          activePage: page > 0 ? page - 1 : 1,
          pageCount: paginationInfo?.pageCount || 1,
          children: [
            /* @__PURE__ */ jsx(PreviousLink, { href: "#", children: "Go to previous page" }),
            startPartPagination().map((el) => /* @__PURE__ */ jsxs(PageLink, { number: el + 1, href: "#", children: [
              "Go to page ",
              el + 1
            ] }, el)),
            middlePartPagination() && /* @__PURE__ */ jsx(Dots, { children: "Other pages" }),
            middlePartPagination() && middlePartPagination()?.map((el) => /* @__PURE__ */ jsxs(PageLink, { number: el + 1, href: "#", children: [
              "Go to page ",
              el + 1
            ] }, el)),
            endPartPagination() && /* @__PURE__ */ jsx(Dots, { children: "Other pages" }),
            endPartPagination() && endPartPagination()?.map((el) => /* @__PURE__ */ jsxs(PageLink, { number: el + 1, href: "#", children: [
              "Go to page ",
              el + 1
            ] }, el)),
            /* @__PURE__ */ jsx(NextLink, { href: "#", children: "Go to next page" })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "sigma", paddingBottom: 1, children: "No targets found." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", fontWeight: "semiBold", children: "Add topics to 'FCM Topic' Collection, and optionally configure which collection contains the devices tokens." }) })
    ] }),
    /* @__PURE__ */ jsxs(Grid.Root, { children: [
      /* @__PURE__ */ jsx(Grid.Item, { col: 12, padding: 1, marginTop: 4, children: /* @__PURE__ */ jsxs(Typography, { variant: "sigma", children: [
        "Targets Selected: ",
        (selectedTargets || []).length
      ] }) }),
      alertToShow && /* @__PURE__ */ jsx(Grid.Item, { col: 12, children: /* @__PURE__ */ jsx(
        Alert,
        {
          onClose: () => setAlertToShow(null),
          closeLabel: "Close alert",
          title: alertToShow.title,
          variant: alertToShow.variant,
          children: alertToShow.message
        }
      ) }),
      /* @__PURE__ */ jsx(Grid.Item, { col: 12, padding: 1, marginTop: 2, children: /* @__PURE__ */ jsx(Button, { onClick: () => sendToSelected(), variant: "default", endIcon: /* @__PURE__ */ jsx(PaperPlane, {}), children: "Send" }) })
    ] })
  ] });
};
const TargetsPage$1 = memo(TargetsPage);
const App = () => {
  const history = useNavigate();
  return /* @__PURE__ */ jsx(Box, { background: "neutral100", padding: 8, children: /* @__PURE__ */ jsxs(Box, { padding: 4, background: "neutral0", hasRadius: true, shadow: "tableShadow", children: [
    /* @__PURE__ */ jsx(Box, { background: "neutral0", paddingBottom: 4, children: /* @__PURE__ */ jsx(
      Button,
      {
        style: { margin: "0 0 0 auto" },
        variant: "secondary",
        endIcon: /* @__PURE__ */ jsx(Pencil, {}),
        onClick: () => history("/content-manager/single-types/plugin::strapi-notifications.fcm-plugin-configuration"),
        children: "Configuration"
      }
    ) }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage$1, {}) }),
      /* @__PURE__ */ jsx(Route, { path: `/targets`, element: /* @__PURE__ */ jsx(TargetsPage$1, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
    ] })
  ] }) });
};
export {
  App
};
