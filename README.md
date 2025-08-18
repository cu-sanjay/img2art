# Image Art Converter

Convert images to text art and vector formats with adjustable intensity and styling options.

## Features

- ASCII art generation with multiple character sets
- Dot-based, block-based, and line-based art styles
- SVG vector conversion with opacity mapping
- Adjustable width and intensity controls
- Copy to clipboard and download functionality
- Responsive design for mobile and desktop

## Deployment

Deploy to Vercel:

```bash
npm install
vercel --prod
```

Or use the Vercel dashboard to import from GitHub.

## Usage

1. Upload an image (JPG, PNG, GIF supported)
2. Select art type (ASCII, dots, blocks, lines)
3. Adjust width and intensity sliders
4. Click Convert to generate art
5. Copy text art or download as TXT/SVG

The tool processes images client-side for privacy and generates both text and vector outputs suitable for various use cases.

## Technical Details

- Next.js API routes for server-side image processing
- Sharp library for efficient image manipulation
- Canvas-free SVG generation for vector output
- Optimized for Vercel serverless deployment