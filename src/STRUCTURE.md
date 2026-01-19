# Project Structure - Refactored

The `src` directory has been reorganized for better maintainability and code reuse.

## New Directory Structure

```
src/
├── hooks/                          # Custom React hooks
│   ├── index.js                    # Barrel export for all hooks
│   ├── useGsapAnimation.js         # GSAP animation hooks
│   ├── useImageSlideshow.js        # Image slideshow hook
│   ├── usePagination.js            # Pagination logic hook
│   └── useRoomIndex.js             # Room lookup hook
│
├── components/
│   ├── common/                     # Reusable common components
│   │   ├── index.js
│   │   ├── AnimatedTitle.jsx
│   │   ├── Button.jsx
│   │   ├── TimelineItem.jsx
│   │   └── VideoPreview.jsx
│   │
│   ├── layout/                     # Layout components
│   │   ├── index.js
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── participants/               # Participants page components
│   │   ├── index.js
│   │   ├── BranchFilter.jsx
│   │   ├── Pagination.jsx
│   │   ├── ParticipantsCards.jsx
│   │   └── ParticipantsTable.jsx
│   │
│   ├── gallery/                    # Gallery page components
│   │   ├── index.js
│   │   ├── ImageSlideshow.jsx
│   │   └── VideoSlideshow.jsx
│   │
│   ├── rundown/                    # Rundown page components
│   │   ├── index.js
│   │   ├── DaySelector.jsx
│   │   ├── GalaAwardsTable.jsx
│   │   ├── RoomCards.jsx
│   │   ├── RoomTable.jsx
│   │   ├── RundownCards.jsx
│   │   ├── RundownTable.jsx
│   │   └── TeamAccordion.jsx
│   │
│   └── [Other components...]       # Legacy components (Hero, About, etc.)
│
├── pages/                          # Main page components
│   ├── DaftarPeserta.jsx
│   ├── Gallery.jsx
│   ├── RundownKegiatan.jsx
│   ├── ContactUs.jsx
│   ├── Publications.jsx
│   └── RHRGreenIdea.jsx
│
├── App.jsx
└── main.jsx
```

## Key Improvements

### 1. **Custom Hooks** (`src/hooks/`)
Extracted reusable logic into custom hooks:
- `usePagination` - Handles pagination logic for tables/lists
- `useImageSlideshow` - Manages image carousel with auto-play
- `useRoomIndex` - Fast lookup for participant room assignments
- `useGsapAnimation` - Reusable GSAP animation effects

### 2. **Component Organization**
- **common/**: Shared UI components used across multiple pages
- **layout/**: Navigation and footer components
- **participants/**: Components specific to the participants page
- **gallery/**: Image and video slideshow components
- **rundown/**: All rundown page components

### 3. **Barrel Exports**
Each directory has an `index.js` file for clean imports:

```javascript
// Before
import AnimatedTitle from "../components/AnimatedTitle";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

// After
import { Navbar, Footer } from "../components/layout";
import { AnimatedTitle } from "../components/common";
```

## Usage Examples

### Using Custom Hooks

```javascript
import { usePagination, useRoomIndex } from "../hooks";

// In your component
const { currentPage, setCurrentPage, currentItems } = usePagination(data, 10);
const { getRoomInfoByName } = useRoomIndex(roomData);
```

### Using Components

```javascript
import { Navbar, Footer } from "../components/layout";
import { AnimatedTitle } from "../components/common";
import { BranchFilter, Pagination } from "../components/participants";
```

## Benefits

1. **Better Code Reuse**: Extracted logic into hooks and components
2. **Easier Maintenance**: Related code is grouped together
3. **Cleaner Imports**: Barrel exports make imports more readable
4. **Reduced Duplication**: Common patterns are now reusable
5. **Type Safety**: Easier to add TypeScript in the future
6. **Testing**: Isolated components are easier to test

## Migration Notes

- All page files have been updated to use the new structure
- Design and functionality remain unchanged
- Build tested and working correctly
- Old component files in `components/` root can be migrated as needed
