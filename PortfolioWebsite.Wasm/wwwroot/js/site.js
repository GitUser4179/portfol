// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
(() => {
    const root = document.getElementById("network-bg");
    if (!root) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d"); // 2d here basically asks you what API you want to call on
    root.appendChild(canvas); // assigns the canvas inside of the network-bg div

    Object.assign(canvas.style, { // assigns the style to the canvas
        width: "100%",
        height: "100%",
        display: "block" // says that we want the canvas to act as a full block, rather than a traditional image which leaves empty space for text
    });

    // we initialize properties we're going to use
    const pointer = { x: 0, y: 0, active: false }; // mouse pointer positioning
    let particles = []
    let width = 0;
    let height = 0;

    function resize() {
        // sets the size of the users viewport size
        width = root.clientWidth;
        height = root.clientHeight;

        const dpr = Math.min(window.devicePixelRatio || 1, 2); // calculates the users devices pixel ratio, which is used to calculate the pixel to screen pixel ratio
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // sets the actual size of the canvas based on the users viewport.

        // describes how many particles we are to use based on screen size, a minimum of 45, and a maximum of 120
        const count = Math.min(120, Math.max(45, Math.floor((width * height) / 14000)));
        particles = Array.from({ length: count }, () => ({ // creates an array of count particles and stores them.
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45
        }));
    }

    function drawLine(a, b, maxDistance) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy) // returns the line distance between the two points using the pythogorean theorem

        if (distance > maxDistance) return; // distance between the two objects may not be larger than maxDistance

        const alpha = 1 - distance / maxDistance; // alpha is the transparency of the object which depends on how far away they are from each other
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha * 0.45})`; // minimum transparency of 0.45?
        ctx.lineWidth = 1;
        ctx.beginPath(); // starts drawing a line from point a to point b
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (const particle of particles) {
            // moves the particles
            particle.x += particle.vx;
            particle.y += particle.vy;

            // makes sure that if a particle hits the edge of the viewport it changes direction
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            // draws the actual dots
            ctx.fillStyle = "rgba(0, 217, 255, 0.9)";
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2); // draws a circulat dot
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                drawLine(particles[i], particles[j], 135) // checks every particle against each other to see if they are permitted to draw lines
            }

            if (pointer.active) {
                drawLine(particles[i], pointer, 180); // draws a line between the mouse pointer and the dots
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize); // when the browser window changes, run the resize function again

    window.addEventListener("mousemove", event => { // when the mouse moves, update its coordinates
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true; // draw lines
    });

    window.addEventListener("mouseleave", () => { // when the mouse leaves the browser window stop drawing lines
        pointer.active = false;
    });

    resize(); // runs the resize function
    animate(); // starts the animation loop
})();