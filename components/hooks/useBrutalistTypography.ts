import { useEffect, useRef, useState, RefObject } from "react";

interface UseBrutalistTypographyOptions {
  padding?: number; // Total padding in pixels (default: 10px)
  baseFontSize?: number; // Base font size for measurement (default: 16px)
  minFontSize?: number; // Minimum font size (default: 12px)
  maxFontSize?: number; // Maximum font size (default: 200px)
  safetyMargin?: number; // Multiplier for safety margin (default: 0.95 = 95%)
  debug?: boolean; // Enable console logging (default: false)
}

/**
 * Custom hook for brutalist edge-to-edge typography on mobile
 * Calculates optimal font size to fill available width perfectly
 */
export function useBrutalistTypography<T extends HTMLElement = HTMLElement>(
  text: string,
  options: UseBrutalistTypographyOptions = {}
) {
  const {
    padding = 10,
    baseFontSize = 16,
    minFontSize = 12,
    maxFontSize = 200,
    safetyMargin = 0.95, // Use 95% of available width to prevent overflow
    debug = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [fontSize, setFontSize] = useState<number>(baseFontSize);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calculateFontSize = async () => {
      // Wait for fonts to be loaded
      try {
        await document.fonts.ready;
      } catch (e) {
        // Fallback if fonts API is not available
        if (debug) console.warn("Fonts API not available, proceeding anyway");
      }

      // Check if we're on mobile
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (!isMobileView || !elementRef.current) {
        // Reset to default on desktop
        if (elementRef.current) {
          elementRef.current.style.fontSize = "";
          elementRef.current.style.overflow = "";
        }
        return;
      }

      const element = elementRef.current;
      
      // Wait for element to be rendered
      if (!element.offsetParent && element.style.display !== "none") {
        // Element not yet visible, try again shortly
        setTimeout(calculateFontSize, 50);
        return;
      }

      // Get computed styles from the actual element
      const computedStyle = getComputedStyle(element);
      
      // Get actual CSS padding from computed styles
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const totalPadding = paddingLeft + paddingRight;
      
      // Get container width - use element's parent or viewport
      const containerElement = element.parentElement;
      const containerWidth = containerElement 
        ? (containerElement.clientWidth || containerElement.offsetWidth)
        : window.innerWidth;
      
      // Calculate available width: subtract padding FIRST, then apply safety margin
      const availableWidth = (containerWidth - totalPadding) * safetyMargin;
      
      // Get all CSS properties that might affect width
      const letterSpacing = computedStyle.letterSpacing;
      const wordSpacing = computedStyle.wordSpacing;
      const textTransform = computedStyle.textTransform;
      const boxSizing = computedStyle.boxSizing;
      const whiteSpace = computedStyle.whiteSpace;
      
      if (debug) {
        console.log(`[Brutalist Typography] Text: "${text}"`);
        console.log(`[Brutalist Typography] Container width: ${containerWidth}px`);
        console.log(`[Brutalist Typography] Padding left: ${paddingLeft}px`);
        console.log(`[Brutalist Typography] Padding right: ${paddingRight}px`);
        console.log(`[Brutalist Typography] Total padding: ${totalPadding}px`);
        console.log(`[Brutalist Typography] Container width - padding: ${(containerWidth - totalPadding).toFixed(2)}px`);
        console.log(`[Brutalist Typography] Safety margin: ${safetyMargin} (${(safetyMargin * 100).toFixed(0)}%)`);
        console.log(`[Brutalist Typography] Available width (after padding & safety margin): ${availableWidth.toFixed(2)}px`);
        console.log(`[Brutalist Typography] CSS properties - letterSpacing: ${letterSpacing}, wordSpacing: ${wordSpacing}, boxSizing: ${boxSizing}, whiteSpace: ${whiteSpace}`);
      }
      
      // Ensure white-space: nowrap is set
      element.style.whiteSpace = "nowrap";
      
      // Step 1: Measure text width at base font size to get initial estimate
      const tempSpan = document.createElement("span");
      tempSpan.style.position = "absolute";
      tempSpan.style.visibility = "hidden";
      tempSpan.style.whiteSpace = "nowrap";
      tempSpan.style.fontSize = `${baseFontSize}px`;
      tempSpan.style.fontFamily = computedStyle.fontFamily;
      tempSpan.style.fontWeight = computedStyle.fontWeight;
      tempSpan.style.fontStyle = computedStyle.fontStyle;
      tempSpan.style.letterSpacing = letterSpacing;
      tempSpan.style.wordSpacing = wordSpacing;
      tempSpan.style.textTransform = textTransform;
      tempSpan.style.boxSizing = boxSizing;
      tempSpan.textContent = text;

      document.body.appendChild(tempSpan);
      
      const textWidthAtBaseSize = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);

      if (textWidthAtBaseSize === 0) {
        if (debug) console.warn("[Brutalist Typography] Could not measure text width");
        return; // Can't measure, skip
      }

      if (debug) {
        console.log(`[Brutalist Typography] Text width at base size (${baseFontSize}px): ${textWidthAtBaseSize.toFixed(2)}px`);
      }

      // Step 2: Calculate initial estimated font size
      let fontSize = (availableWidth / textWidthAtBaseSize) * baseFontSize;

      // Clamp between min and max
      fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));

      if (debug) {
        console.log(`[Brutalist Typography] Initial calculated size: ${fontSize.toFixed(2)}px`);
      }

      // Helper function to measure actual text width (not container width)
      const measureTextWidth = (testFontSize: number): number => {
        // Create a span inside the element to measure the actual text
        const measureSpan = document.createElement('span');
        measureSpan.style.display = 'inline-block';
        measureSpan.style.whiteSpace = 'nowrap';
        measureSpan.textContent = element.textContent || text;
        measureSpan.style.fontSize = `${testFontSize}px`;
        measureSpan.style.fontFamily = computedStyle.fontFamily;
        measureSpan.style.fontWeight = computedStyle.fontWeight;
        measureSpan.style.fontStyle = computedStyle.fontStyle;
        measureSpan.style.letterSpacing = letterSpacing;
        measureSpan.style.wordSpacing = wordSpacing;
        measureSpan.style.textTransform = textTransform;
        
        // Temporarily append to element to measure
        element.appendChild(measureSpan);
        const actualTextWidth = measureSpan.getBoundingClientRect().width;
        element.removeChild(measureSpan);
        
        return actualTextWidth;
      };

      // Step 3: Apply the font size to the element
      element.style.fontSize = `${fontSize}px`;
      
      // Step 4: Measure the ACTUAL text width at this size (not container width)
      // Force a reflow to ensure the font size is applied
      void element.offsetHeight;
      
      const actualWidth = measureTextWidth(fontSize);

      if (debug) {
        console.log(`[Brutalist Typography] Actual text width at ${fontSize.toFixed(2)}px: ${actualWidth.toFixed(2)}px`);
        console.log(`[Brutalist Typography] Available width: ${availableWidth.toFixed(2)}px`);
      }

      // Step 5: If it overflows, reduce proportionally (no buffer - we're measuring actual text)
      if (actualWidth > availableWidth) {
        // Direct adjustment without buffer - we're measuring the actual text span
        const adjustmentRatio = availableWidth / actualWidth;
        fontSize = fontSize * adjustmentRatio;
        element.style.fontSize = `${fontSize}px`;
        
        // Force reflow and measure again
        void element.offsetHeight;
        const finalWidth = measureTextWidth(fontSize);
        
        if (debug) {
          console.log(`[Brutalist Typography] Overflow detected! Adjusting...`);
          console.log(`[Brutalist Typography] Adjustment ratio: ${adjustmentRatio.toFixed(4)}`);
          console.log(`[Brutalist Typography] Adjusted size: ${fontSize.toFixed(2)}px`);
          console.log(`[Brutalist Typography] Adjusted text width: ${finalWidth.toFixed(2)}px`);
        }
        
        // If STILL overflowing, adjust again (should rarely happen)
        if (finalWidth > availableWidth) {
          const secondAdjustmentRatio = availableWidth / finalWidth;
          fontSize = fontSize * secondAdjustmentRatio;
          element.style.fontSize = `${fontSize}px`;
          
          // Force reflow for final measurement
          void element.offsetHeight;
          const secondFinalWidth = measureTextWidth(fontSize);
          
          if (debug) {
            console.log(`[Brutalist Typography] Still overflowing! Second adjustment...`);
            console.log(`[Brutalist Typography] Second adjustment ratio: ${secondAdjustmentRatio.toFixed(4)}`);
            console.log(`[Brutalist Typography] Final adjusted size: ${fontSize.toFixed(2)}px`);
            console.log(`[Brutalist Typography] Final adjusted text width: ${secondFinalWidth.toFixed(2)}px`);
          }
        }
      }

      setFontSize(fontSize);
      
      // Only set overflow hidden, let font-size do the work (no max-width constraint)
      element.style.overflow = "hidden";
      
      if (debug) {
        // Final measurement of actual text width
        void element.offsetHeight;
        const finalTextWidth = measureTextWidth(fontSize);
        const containerWidth = element.getBoundingClientRect().width;
        console.log(`[Brutalist Typography] Final applied size: ${fontSize.toFixed(2)}px`);
        console.log(`[Brutalist Typography] Final text width: ${finalTextWidth.toFixed(2)}px`);
        console.log(`[Brutalist Typography] Container width: ${containerWidth.toFixed(2)}px`);
        console.log(`[Brutalist Typography] Available width: ${availableWidth.toFixed(2)}px`);
        console.log(`[Brutalist Typography] Overflow check: ${finalTextWidth > availableWidth ? 'OVERFLOW!' : 'OK'}`);
        console.log(`[Brutalist Typography] ---`);
      }
    };

    // Initial calculation - wait for fonts and DOM
    const initCalculation = async () => {
      await document.fonts.ready;
      requestAnimationFrame(() => {
        setTimeout(calculateFontSize, 0);
      });
    };
    
    initCalculation();

    // Debounce resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = async () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(async () => {
        await document.fonts.ready;
        calculateFontSize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    // Also listen for orientation changes
    window.addEventListener("orientationchange", async () => {
      await document.fonts.ready;
      setTimeout(calculateFontSize, 200); // Give more time for orientation change
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [text, padding, baseFontSize, minFontSize, maxFontSize, safetyMargin, debug]);

  return { elementRef: elementRef as RefObject<T>, fontSize, isMobile };
}
