// DOM Getter
const names = document.querySelectorAll('#name path:not(.blur)');
const butterfly = {
	inner: document.querySelectorAll('.butterflyInner:not(.blur)'),
	outer: document.querySelectorAll('.butterflyOuter:not(.blur)'),
};
const blurs = document.querySelectorAll('.blur');

// Variable Declaration
const allButterflyPart = document.querySelectorAll(
	'#butterfly path:not(.blur)'
);
const firstDelay = names.length * 0.3;
const secondDelay = firstDelay + allButterflyPart.length * 0.3;
const thirdDelay = secondDelay + blurs.length * 0.3;
const animationInDuration = 1;
const animationOutDuration = 2;

names.forEach((name, i) => {
	name.style.strokeDasharray = name.getTotalLength();
	name.style.strokeDashoffset = name.getTotalLength();
	name.style.animation = `line-anim ${animationInDuration}s ease-out forwards calc(0.3s * ${i}), line-anim ${animationOutDuration}s ease-out reverse forwards ${
		secondDelay - 0.5
	}s`;
});

butterfly.outer.forEach((element, i) => {
	element.style.strokeDasharray = element.getTotalLength();
	element.style.strokeDashoffset = element.getTotalLength();
	element.style.animation = `line-anim ${animationInDuration}s ease-out forwards ${
		firstDelay - 0.5
	}s, line-anim ${animationOutDuration}s ease-out reverse forwards ${secondDelay}s`;
});

butterfly.inner.forEach((element, i) => {
	element.style.strokeDasharray = element.getTotalLength();
	element.style.strokeDashoffset = element.getTotalLength();
	element.style.animation = `fade-in-anim ${
		animationInDuration / 2
	}s ease-out forwards ${
		firstDelay + 1
	}s, fade-out-anim ${animationOutDuration}s ease-out forwards ${
		secondDelay - 1
	}s`;
});

blurs.forEach((element) => {
	element.style.animation = `fade-in-anim ${
		animationInDuration / 2
	}s ease-out forwards ${
		firstDelay + 1
	}s, fade-out-anim ${animationOutDuration}s ease-out forwards ${
		secondDelay - 1
	}s`;
});
