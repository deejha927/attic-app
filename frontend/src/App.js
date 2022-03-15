import React, { useState, useEffect, useCallback } from 'react';
import { colorApi } from './api/colorapi';
import { ColorPicker, TextField, AppProvider, Spinner, Button } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import HSL2COLOR from './components/convert';
import "./App.css"
function App() {

  const [color, setColor] = useState({
    hue: 355,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7
  });
  const [value, setValue] = useState('');
  const [image, setImage] = useState("noimage.jpg");
  const [loading, setLoading] = useState(false)
  const handleUrlChange = useCallback((value) => setValue(value), []);
  const testColorApi = (event) => {
    if (value !== "") {
      setColor(event)
      const hex = (HSL2COLOR("hsla(" + color?.hue + "," + (color?.saturation * 100) + "%," + (color?.brightness * 100) + "%," + color?.alpha + ")"))
      colorApi(hex?.hsla, value)
        .then((data) => {
          setImage(data?.imageBase)
          setLoading(false);
        }, [])
    }
  }
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <div className='container'>
          <div style={{ width: "70%", marginBottom: "1em", "display": "inline-block" }}>
            <TextField
              value={value}
              onChange={handleUrlChange}
              label="Your Quotes"
              placeholder='Your Quotes'
              autoComplete="off"

            />

          </div>
          <ColorPicker onChange={testColorApi} color={color} allowAlpha fullWidth={false} />
          <div role="img" aria-labelledby="star_id" className='imgDiv'>
            {loading && (<div id="spinner"><Spinner accessibilityLabel="Spinner example" size="large" /></div>)}
            {!loading && (<img src={image} alt="images" />)}

          </div>
        </div>
      </AppProvider>
    </>
  );
}

export default App;
