// a little component that just injects oneko.js (https://github.com/adryd325/oneko.js) into the dom

import { useEffect } from "react";

const Oneko = () => {
  useEffect(() => {
    // oneko.js: https://github.com/adryd325/oneko.js

    (function oneko() {
      const nekoEl = document.createElement("div");
      let nekoPosX = 16;
      let nekoPosY = 16;
      let mousePosX = 0;
      let mousePosY = 0;
      const isReduced =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
      if (isReduced) {
        return;
      }

      let frameCount = 0;
      let idleTime = 0;
      let idleAnimation = null;
      let idleAnimationFrame = 0;
      const nekoSpeed = 10;
      const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratchSelf: [
          [-5, 0],
          [-6, 0],
          [-7, 0],
        ],
        scratchWallN: [
          [0, 0],
          [0, -1],
        ],
        scratchWallS: [
          [-7, -1],
          [-6, -2],
        ],
        scratchWallE: [
          [-2, -2],
          [-2, -3],
        ],
        scratchWallW: [
          [-4, 0],
          [-4, -1],
        ],
        tired: [[-3, -2]],
        sleeping: [
          [-2, 0],
          [-2, -1],
        ],
        N: [
          [-1, -2],
          [-1, -3],
        ],
        NE: [
          [0, -2],
          [0, -3],
        ],
        E: [
          [-3, 0],
          [-3, -1],
        ],
        SE: [
          [-5, -1],
          [-5, -2],
        ],
        S: [
          [-6, -3],
          [-7, -2],
        ],
        SW: [
          [-5, -3],
          [-6, -1],
        ],
        W: [
          [-4, -2],
          [-4, -3],
        ],
        NW: [
          [-1, 0],
          [-1, -1],
        ],
      };

      function create() {
        if (Array.from(document.getElementsByClassName("oneko")).length > 0)
          return;

        let settings =
          JSON.parse(localStorage.getItem("transitstatus_v1_settings")) ?? {};

        //fallback for oneko type if not defined
        if (!settings.catType) settings.catType = 'onkeo';


        console.log("Oneko setting:", settings.showCat);
        console.log("Onkeko type:", settings.catType)

        if (!settings.showCat) return;

        nekoEl.id = "oneko";
        nekoEl.className = "oneko";
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "fixed";
        nekoEl.style.pointerEvents = "none";
        nekoEl.style.backgroundImage = `url('/${settings.catType}.gif')`;
        nekoEl.style.imageRendering = "pixelated";
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.zIndex = Number.MAX_VALUE;

        document.body.appendChild(nekoEl);

        document.addEventListener("mousemove", (event) => {
          mousePosX = event.clientX;
          mousePosY = event.clientY;
        });

        ["touchstart", "touchmove", "touchend"].forEach((eventName) => {
          document.addEventListener(eventName, (event) => {
            if (event.targetTouches.length < 1) return;

            mousePosX = event.targetTouches[0].clientX;
            mousePosY = event.targetTouches[0].clientY;
          });
        });

        window.onekoInterval = setInterval(frame, 100);
      }

      function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
          sprite[1] * 32
        }px`;
      }

      function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
      }

      function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
          idleTime > 10 &&
          Math.floor(Math.random() * 200) == 0 &&
          idleAnimation == null
        ) {
          let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
          if (nekoPosX < 32) {
            avalibleIdleAnimations.push("scratchWallW");
          }
          if (nekoPosY < 32) {
            avalibleIdleAnimations.push("scratchWallN");
          }
          if (nekoPosX > window.innerWidth - 32) {
            avalibleIdleAnimations.push("scratchWallE");
          }
          if (nekoPosY > window.innerHeight - 32) {
            avalibleIdleAnimations.push("scratchWallS");
          }
          idleAnimation =
            avalibleIdleAnimations[
              Math.floor(Math.random() * avalibleIdleAnimations.length)
            ];
        }

        switch (idleAnimation) {
          case "sleeping":
            if (idleAnimationFrame < 8) {
              setSprite("tired", 0);
              break;
            }
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            if (idleAnimationFrame > 192) {
              resetIdleAnimation();
            }
            break;
          case "scratchWallN":
          case "scratchWallS":
          case "scratchWallE":
          case "scratchWallW":
          case "scratchSelf":
            setSprite(idleAnimation, idleAnimationFrame);
            if (idleAnimationFrame > 9) {
              resetIdleAnimation();
            }
            break;
          default:
            setSprite("idle", 0);
            return;
        }
        idleAnimationFrame += 1;
      }

      function frame() {
        frameCount += 1;
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
          idle();
          return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
          setSprite("alert", 0);
          // count down after being alerted before moving
          idleTime = Math.min(idleTime, 7);
          idleTime -= 1;
          return;
        }

        let direction;
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      }

      create();
    })();
  }, []);

  return <></>;
};

export default Oneko;
