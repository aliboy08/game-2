const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const cardName = 'heart_13';
    const cardWidth = 100;
    const cardHeight = 145;
    const cardPadding = 10;
    let imagesCanvas = {};

    let position = {
      x: cardPadding,
      origX: cardPadding,
      y: cardPadding,
      origY: cardPadding,
      xMax: canvas.width - cardPadding - cardWidth,
      yMax: canvas.height - cardPadding - cardHeight
    };

    function getEase(currentProgress, start, distance, steps, animationFunction) {
      switch(animationFunction) {
        case 'static':
          return cardPadding; break;
        case 'quadratic':
          return getQuadraticEase(currentProgress, start, distance, steps); break;
        case 'cubic':
          return getCubicEase(currentProgress, start, distance, steps); break;
        case 'quartic':
          return getQuarticEase(currentProgress, start, distance, steps); break;
        case 'quintic':
          return getQuinticEase(currentProgress, start, distance, steps); break;
        case 'sinusoidal':
          return getSinusoidalEase(currentProgress, start, distance, steps); break;
        case 'exponential':
          return getExponentialEase(currentProgress, start, distance, steps); break;
      }
    }

    function getQuadraticEase(currentProgress, start, distance, steps) {
      currentProgress /= steps/2;
      if (currentProgress <= 1) {
        return (distance/2)*currentProgress*currentProgress + start;
      }
      currentProgress--;
      return -1*(distance/2) * (currentProgress*(currentProgress-2) - 1) + start;
    }

    function getCubicEase(currentProgress, start, distance, steps) {
      currentProgress /= steps/2;
      if (currentProgress < 1) {
        return (distance/2)*(Math.pow(currentProgress, 3)) + start;
      }
      currentProgress -= 2;
      return distance/2*(Math.pow(currentProgress, 3)+ 2) + start;
    }

    function getQuarticEase(currentProgress, start, distance, steps) {
      currentProgress /= steps/2;
      if (currentProgress < 1) {
        return (distance/2)*(Math.pow(currentProgress, 4)) + start;
      }
      currentProgress -= 2;
      return -1*distance/2*(Math.pow(currentProgress, 4) - 2) + start;
    }

    function getQuinticEase(currentProgress, start, distance, steps) {
      currentProgress /= steps/2;
      if (currentProgress < 1) {
        return (distance/2)*(Math.pow(currentProgress, 5)) + start;
      }
      currentProgress -= 2;
      return distance/2*(Math.pow(currentProgress, 5) + 2) + start;
    }

    function getSinusoidalEase(currentProgress, start, distance, steps) {
      return -distance/2 * (Math.cos(Math.PI*currentProgress/steps) - 1) + start;
    }

    function getExponentialEase(currentProgress, start, distance, steps) {
      currentProgress /= steps/2;
      if (currentProgress < 1) {
        return distance/2 * Math.pow( 2, 10 * (currentProgress - 1) ) + start;
      }
      currentProgress--;
      return distance/2 * ( -Math.pow( 2, -10 * currentProgress) + 2 ) + start;
    }

    function getX(params) {
      let distance = params.xTo - params.xFrom;
      let steps = params.frames;
      let currentProgress = params.frame;
      return getEase(currentProgress, params.xFrom, distance, steps, params.type);
    }

    function getY(params) {
      let distance = params.yTo - params.yFrom;
      let steps = params.frames;
      let currentProgress = params.frame;
      return getEase(currentProgress, params.yFrom, distance, steps, params.type);
    }

    function drawCanvas() {
      ctx.fillStyle = 'rgb(0,80,0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function addImage(params) {
      let name = params.name;
      if (imagesCanvas[name] === undefined) {
        imagesCanvas[name] = document.createElement('canvas');
      }
      imagesCanvas[name].width = cardWidth;
      imagesCanvas[name].height = cardHeight;

      let image = document.getElementById(name);

      let imageCtx = imagesCanvas[name].getContext('2d');
      imageCtx.clearRect(0, 0, cardWidth, cardHeight);
      imageCtx.drawImage(image, 0, 0, cardWidth, cardHeight);

      if (params.library == 'gsap') {
        ctx.drawImage(imagesCanvas[name], params.x, params.y);
      } else {
        ctx.drawImage(imagesCanvas[name], getX(params), getY(params));
        if (params.frame < params.frames) {
          params.frame = params.frame + 1;
          window.requestAnimationFrame(drawCanvas);
          window.requestAnimationFrame(addImage.bind(null, params))
        }
      }
    }

    function draw() {
      drawCanvas();
      addImage({
        name: cardName,
        frame: 0,
        frames: 100,
        xFrom: cardPadding,
        xTo: canvasWidth - cardWidth - cardPadding,
        yFrom: cardPadding,
        yTo: canvasHeight - cardHeight - cardPadding,
        type: $('#animationType').val(),
        library: 'none'
      });
    }

    //gsap section
    function drawGsap() {
      drawCanvas();
      addImage({
        name: cardName,
        library: 'gsap',
        x: position.x,
        y: position.y
      });
    }

    function runGsap() {
      gsap.to(position, {
        duration: 2,
        ease: $('#animationType').val(),
        x: position.xMax,
        y: position.yMax,
        onUpdate: function() {
          drawGsap();
        },
        onComplete: function() {
          position.x = position.origX;
          position.y = position.origY;
        }
      });
    }

    function playAnimation() {
      if (['quadratic', 'cubic', 'quartic', 'quintic', 'sinusoidal', 'exponential'].includes($('#animationType').val())) {
        draw();
      } else {
        runGsap();
      }
    }

    window.onload = draw;