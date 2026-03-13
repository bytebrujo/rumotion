import {Internals} from 'picus';
import {DEFAULT_PROPS_PATH_ACTIVE_CLASSNAME} from '../components/RenderModal/SchemaEditor/scroll-to-default-props-path';

const makeDefaultGlobalCSS = () => {
	const unhoveredDragAreaFactor = 2;
	const fromMiddle = 50 / unhoveredDragAreaFactor;

	const hoveredDragAreaFactor = 6;
	const fromMiddleHovered = 50 / hoveredDragAreaFactor;

	return `
  html {
    --picus-cli-internals-blue: #0b84f3;
    --picus-cli-internals-blue-hovered: #4da3f7;
    overscroll-behavior-y: none;
    overscroll-behavior-x: none;
  }
  
  body {
    overscroll-behavior-y: none;
    overscroll-behavior-x: none;
    /* Override Chakra UI position: relative on body */
    position: static !important;
  }

  .picus-splitter {
    user-select: none;
    -webkit-user-select: none;
  }
  
  .picus-splitter-horizontal {
    transform: scaleY(${unhoveredDragAreaFactor});
    background: linear-gradient(
      to bottom,
      transparent ${50 - fromMiddle}%,
      black ${50 - fromMiddle}%,
      black ${50 + fromMiddle}%,
      transparent ${50 + fromMiddle}%
    );
  }
  
  .picus-splitter-horizontal.picus-splitter-active, .picus-splitter-horizontal.picus-splitter-hover {
    background: linear-gradient(
      to bottom,
      transparent ${50 - fromMiddleHovered}%,
      var(--picus-cli-internals-blue) ${50 - fromMiddleHovered}%,
      var(--picus-cli-internals-blue) ${50 + fromMiddleHovered}%,
      transparent ${50 + fromMiddleHovered}%
    );
    cursor: row-resize;
    transform: scaleY(${hoveredDragAreaFactor});
    z-index: 1000;
  }
  
  .picus-splitter-vertical {
    transform: scaleX(${unhoveredDragAreaFactor});
    background: linear-gradient(
      to right,
      transparent ${50 - fromMiddle}%,
      black ${50 - fromMiddle}%,
      black ${50 + fromMiddle}%,
      transparent ${50 + fromMiddle}%
    );
  }
  
  .picus-splitter-vertical.picus-splitter-active, .picus-splitter-vertical.picus-splitter-hover {
    background: linear-gradient(
      to right,
      transparent ${50 - fromMiddleHovered}%,
      var(--picus-cli-internals-blue) ${50 - fromMiddleHovered}%,
      var(--picus-cli-internals-blue) ${50 + fromMiddleHovered}%,
      transparent ${50 + fromMiddleHovered}%
    );
    transform: scaleX(${hoveredDragAreaFactor});
    cursor: col-resize;
    z-index: 1000;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input:focus,
  textarea:focus,
  button:focus:not(.__picus_input_dragger),
  a:focus {
    outline: none;
    box-shadow:
      inset 1px 1px #555,
      inset -1px -1px #555,
      inset 1px -1px #555,
      inset -1px 1px #555;
  }
  
  input[type='color'].__picus_color_picker::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type='color'].__picus_color_picker::-webkit-color-swatch {
    border: none;
  }
  
  .__picus_thumb,
  .__picus_thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  .__picus_thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    outline: none;
    top: 15.5px;
    width: 221px;
    margin-left: -2px;
    z-index: 2;
  }
  
  /* For Firefox browsers */
  .__picus_thumb::-moz-range-thumb {
    border: 1px solid black;
    border-radius: 2px;
    cursor: pointer;
    height: 37px;
    width: 10px;
    pointer-events: all;
    border-color: black;
    background-color: white;
    position: relative;
  }
  
  /* For Chrome browsers */
  .__picus_thumb::-webkit-slider-thumb {
    border: 1px solid black;
    border-radius: 2px;
    cursor: pointer;
    height: 39px;
    width: 10px;
    pointer-events: all;
    border-color: black;
    background-color: white;
    position: relative;
  }  

  .__picus_input_dragger:hover span {
    color: var(--picus-cli-internals-blue-hovered) !important;
  }

  .${DEFAULT_PROPS_PATH_ACTIVE_CLASSNAME} span {
    color: var(--picus-cli-internals-blue) !important;
    transition: color 0.2s ease-in-out;
  }
  `.trim();
};

let injected = false;

export const injectCSS = () => {
	if (injected) {
		return;
	}

	Internals.CSSUtils.injectCSS(makeDefaultGlobalCSS());
	injected = true;
};
