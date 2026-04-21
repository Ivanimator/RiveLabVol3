const ARTBOARD_NAME = "Main";
const STATE_MACHINE_NAME = "State Machine 1";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("riveCanvas");

  const riveInstance = new rive.Rive({
    src: "riv/billetesCarrusel.riv",
    canvas,
    autoplay: true,
    useOffscreenRenderer: true,
    artboard: ARTBOARD_NAME,
    stateMachines: STATE_MACHINE_NAME,
    autoBind: true,
    // --- THIS IS THE CRITICAL ADDITION ---
    layout: new rive.Layout({
      fit: rive.Fit.layout, // This forces it to respect your Rive Layout components
      alignment: rive.Alignment.center,
    }),

    onLoad: () => {
      console.log("Rive loaded ✅");

      // Ensure drawing surface matches the canvas size
      riveInstance.resizeDrawingSurfaceToCanvas();

      const inputs = riveInstance.stateMachineInputs(STATE_MACHINE_NAME);
      console.log(
        "Inputs:",
        inputs.map((i) => ({
          name: i.name,
          type: i.type,
          value: i.value,
        }))
      );
    },

    onError: (e) => {
      console.error("Rive error ❌", e);
    },
  });

  // Listener to keep the resolution sharp if you resize the browser window
  window.addEventListener("resize", () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
  });
});