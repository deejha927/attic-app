import React, { useState } from 'react';
import { ColorPicker } from '@shopify/polaris';

export default function ColorPickerWithTransparent() {
    const [color, setColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7
    });

    return <ColorPicker onChange={setColor} color={color} allowAlpha fullWidth={false} />;
}