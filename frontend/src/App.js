import React, { useState, useEffect, useCallback } from 'react';
import { colorApi } from './api/colorapi';
import { ColorPicker, TextField, AppProvider, Spinner, Layout } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import "./App.css"
import { hsbToRgb } from '@shopify/polaris';
function App() {

  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });
  const [value, setValue] = useState('');
  const [image, setImage] = useState("noimage.jpg");
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState("none")
  const handleUrlChange = (value) => {
    setValue(value);
    const hsb = hsbToRgb(color)
    if (value !== "") {
      setDisplay("none")
      setLoading(true);
      const rgba = `rgba(${hsb?.red},${hsb?.green},${hsb?.blue},${hsb?.alpha})`
      colorApi(rgba, value)
        .then((data) => {
          setImage(data?.imageBase)
          setLoading(false);
        }, [])
    } else {
      setDisplay("block")
      setImage("noimage.jpg")
    }
  }

  // useCallback((value) => setValue(value), []);
  const testColorApi = (event) => {
    setColor(event)
    const hsb = hsbToRgb(color)
    if (value !== "") {
      setDisplay("none")
      setLoading(true);
      const rgba = `rgba(${hsb?.red},${hsb?.green},${hsb?.blue},${hsb?.alpha})`
      colorApi(rgba, value)
        .then((data) => {
          setImage(data?.imageBase)
          setLoading(false);
        }, [])
    } else {
      setDisplay("block")
      setImage("noimage.jpg")
    }
  }
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <div className='container'>
          <Layout>
            <Layout.Section>
              <div style={{ width: "70%", marginBottom: "1em", "display": "inline-block" }}>
                <TextField
                  value={value}
                  onChange={handleUrlChange}
                  label="Your Quotes"
                  placeholder='Your Quotes'
                  autoComplete="off"

                />
                <p style={{ color: "red", display: display }}>Field should not be empty*</p>
              </div>

              <ColorPicker onChange={testColorApi} color={color} allowAlpha />
              <div role="img" aria-labelledby="star_id" className='imgDiv'>
                {loading && (<div id="spinner"><Spinner accessibilityLabel="Spinner example" size="large" /></div>)}
                {!loading && (<img src={image} alt="images" />)}

              </div>
            </Layout.Section>
          </Layout>
        </div>
      </AppProvider>
    </>
  );
}

export default App;
