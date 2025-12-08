"use strict";
const react = require("react");
const jsxRuntime = require("react/jsx-runtime");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "strapi-notifications";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 32 32", children: [
  /* @__PURE__ */ jsxRuntime.jsx("title", { children: "file_type_firebase" }),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M5.8,24.6l.17-.237L13.99,9.149l.017-.161L10.472,2.348a.656.656,0,0,0-1.227.207Z",
      style: { fill: "#c5c5c5" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M5.9,24.42l.128-.25L13.965,9.114,10.439,2.448a.6.6,0,0,0-1.133.206Z",
      style: { fill: "#f0eadf" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M16.584,14.01l2.632-2.7L16.583,6.289a.678.678,0,0,0-1.195,0L13.981,8.971V9.2Z",
      style: { fill: "#c8c8c8" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M16.537,13.9l2.559-2.62L16.537,6.4a.589.589,0,0,0-1.074-.047L14.049,9.082l-.042.139Z",
      style: { fill: "#464646" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "polygon",
    {
      points: "5.802 24.601 5.879 24.523 6.158 24.41 16.418 14.188 16.548 13.834 13.989 8.956 5.802 24.601",
      style: { fill: "#232323" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M16.912,29.756,26.2,24.577,23.546,8.246A.635.635,0,0,0,22.471,7.9L5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0",
      style: { fill: "#b1b1b1" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M26.115,24.534,23.483,8.326a.557.557,0,0,0-.967-.353L5.9,24.569l9.131,5.1a1.912,1.912,0,0,0,1.863,0Z",
      style: { fill: "#525252" }
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "M16.912,29.6a1.927,1.927,0,0,1-1.878,0L5.876,24.522,5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0L26.2,24.577l-.023-.14Z",
      style: { fill: "#4b4a48" }
    }
  )
] });
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
      },
      Component: async () => {
        const { App } = await Promise.resolve().then(() => require("./index-BYhdWzX-.js"));
        return App;
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-lha4t5yi.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.index = index;
