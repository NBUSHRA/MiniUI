import React, { useEffect, useState } from 'react';

const ThemeCustomizer = () => {
    const [theme, setTheme] = useState('light');
    const [primaryColor, setPrimaryColor] = useState('#ffffff');
    const [secondaryColor, setSecondaryColor] = useState('#000000');
    const [fontSize, setFontSize] = useState('16px');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const storedPrimaryColor = localStorage.getItem('primaryColor');
        const storedSecondaryColor = localStorage.getItem('secondaryColor');
        const storedFontSize = localStorage.getItem('fontSize');

        if (storedTheme) setTheme(storedTheme);
        if (storedPrimaryColor) setPrimaryColor(storedPrimaryColor);
        if (storedSecondaryColor) setSecondaryColor(storedSecondaryColor);
        if (storedFontSize) setFontSize(storedFontSize);
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
        document.body.style.color = theme === 'dark' ? '#fff' : '#000';
        document.body.style.setProperty('--primary-color', primaryColor);
        document.body.style.setProperty('--secondary-color', secondaryColor);
        document.body.style.fontSize = fontSize;
        localStorage.setItem('theme', theme);
        localStorage.setItem('primaryColor', primaryColor);
        localStorage.setItem('secondaryColor', secondaryColor);
        localStorage.setItem('fontSize', fontSize);
    }, [theme, primaryColor, secondaryColor, fontSize]);

    return (
        <div>
            <h2>Theme Customizer</h2>
            <div>
                <label>
                    Theme:
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Primary Color:
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Secondary Color:
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Font Size:
                    <input type="number" value={parseInt(fontSize)} onChange={(e) => setFontSize(`${e.target.value}px`)} /> px
                </label>
            </div>
        </div>
    );
};

export default ThemeCustomizer;