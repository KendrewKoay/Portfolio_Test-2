# How to Add Your Own Images to Your GitHub Repository

To replace all portfolio images with your own custom images directly on GitHub or in your local code repository:

## Step 1: Upload Your Image Files
Place all your image files inside the `public/images/` folder in this repository.

For example:
- `public/images/hero-slider-1.jpg`
- `public/images/project-type-space.jpg`
- `public/images/project-flux-forms.jpg`
- `public/images/project-pedagogical.jpg`
- `public/images/research-1.jpg`
- `public/images/teaching-1.jpg`

---

## Step 2: Reference Your Images in `src/data/portfolioData.ts`
In `src/data/portfolioData.ts`, update the `image`, `gallery`, or `url` properties to point to your new image paths in `public/images/`:

### Example for Projects:
```typescript
image: 'images/project-type-space.jpg',
gallery: [
  'images/project-type-space-1.jpg',
  'images/project-type-space-2.jpg',
],
```

### Example for Top Image Slider:
```typescript
export const SLIDER_IMAGES = [
  {
    url: 'images/hero-slider-1.jpg',
    alt: 'Design Work',
    caption: 'Experimental Type Grid System',
  },
  ...
];
```

---

## How to Upload Directly on GitHub.com (No Terminal Needed):
1. Go to your GitHub repository in your browser.
2. Navigate to the `public/images/` folder (or click **Add file** -> **Upload files**).
3. Drag and drop your image files (`.png`, `.jpg`, `.webp`, `.svg`).
4. Click **Commit changes**.
5. Edit `src/data/portfolioData.ts` on GitHub directly to update the file names!
6. GitHub Actions will automatically re-deploy your site with the new images within 1–2 minutes!
