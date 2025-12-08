/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Information, ArrowRight } from '@strapi/icons';

import { Button, Tooltip, Field, Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';

const HomePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [payload, setPayload] = useState('');
  const [image, setImage] = useState('');

  const handleEntry = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('You have submitted the form.');
    // check title
    if (title.trim().length !== 0) {
      const entry = {
        title: title,
        body: body,
        payload: payload,
        image: image,
      };
      // send data to local storage
      localStorage.setItem('fcmLastNotification', JSON.stringify(entry));
      navigate(pathname + '/targets');
    } else {
      alert(formatMessage({ id: getTranslation('Please enter a title') }));
    }
  };
  return (
    <form onSubmit={handleEntry}>
      <Box padding={1}>
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Field.Input
            placeholder="Enter notification title"
            title="Title"
            name="title"
            // hasError={title.length < 1 ? 'Title is a required field.' : undefined}
            hasError={!!title.length}
            aria-errormessage={title.length < 1 ? 'Title is a required field.' : undefined}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            value={title}
            endAction={
              <Tooltip title="Shown to end users as the notification title">
                <button
                  type="button"
                  aria-label="Information about the title"
                  style={{
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                  }}
                >
                  <Information aria-hidden={true} />
                </button>
              </Tooltip>
            }
          />
        </Field.Root>
      </Box>
      <Box padding={1}>
        <Field.Root>
          <Field.Label>Body (optional)</Field.Label>
          <Field.Input
            placeholder="Enter notification text"
            name="body"
            onChange={(e: any) => setBody(e.target.value)}
            value={body}
          />
        </Field.Root>
      </Box>
      <Box padding={1}>
        <Field.Root>
          <Field.Label>Image (Optional)</Field.Label>
          <Field.Input
            placeholder="Enter notification image url"
            name="image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
            value={image}
            endAction={
              <Tooltip title="Optionally provide a valid HTTPS image URL">
                <button
                  type="button"
                  aria-label="Information about the image"
                  style={{
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                  }}
                >
                  <Information aria-hidden={true} />
                </button>
              </Tooltip>
            }
          />
        </Field.Root>
      </Box>
      <Box padding={1}>
        <details>
          <summary style={{ cursor: 'pointer', paddingBottom: '1em' }}>Extra payload</summary>
          <fieldset>
            <Field.Root>
              <Field.Label>Extra Payload (Optional)</Field.Label>
              <Field.Input
                placeholder={'Enter extra payload json {"notification", "data"}'}
                name="payload"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayload(e.target.value)}
                value={payload}
              />
            </Field.Root>
          </fieldset>
        </details>
      </Box>
      <Box padding={1}>
        <Button type="submit" variant="default" endIcon={<ArrowRight />}>
          Next
        </Button>
      </Box>
    </form>
  );
};

export default memo(HomePage);
