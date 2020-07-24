//// DOM Getter ////
const allPaths = document.querySelectorAll('path:not(.blur)');
const butterfly = {
	inner: document.querySelectorAll('.butterflyInner:not(.blur)'),
	outer: document.querySelectorAll('.butterflyOuter:not(.blur)'),
};
const rushia = document.querySelector('#rushia');
const rushiaPath = document.querySelector('#rushia path');
const names = document.querySelectorAll('#name path:not(.blur)');
const namesUpper = document.querySelectorAll('#nameUpper path:not(.blur)');

const blurs = document.querySelectorAll('.blur');

const allButterflyPart = document.querySelectorAll(
	'#butterfly path:not(.blur)'
);

//// Variable ////
const strokeThickness = 10;

//// Initial Condition ////
allPaths.forEach((path) => {
	path.style.strokeDashoffset = path.getTotalLength();
	// path.style.strokeDasharray = 70;
});

// Hide Rushia
rushia.style.bottom = '-75%';

//// Color Declaration ////
// Light Settings
const colorCollection = {
	background: 'white',
	butterfly: '#6fc2d1',
	rushia: '#00889F',
	names: '#092A57',
	namesUpper: '#00BCDF',
	shadow: '#8FBDD4',
};

// Dark Settings
// const colorCollection = {
// 	background: 'rgb(32, 35, 48)',
// 	names: 'white',
// 	namesUpper: '#1CD9FC',
// 	butterfly: '#98E4F7',
// 	shadow: 'white',
// };

//// Set Color ////
// BACKGROUND
document.querySelector('body').style.backgroundColor =
	colorCollection.background;
// BUTTERFLY
butterfly.outer.forEach((butterfly) => {
	butterfly.setAttribute('stroke', colorCollection.butterfly);
});
butterfly.inner.forEach((butterfly) => {
	butterfly.setAttribute('fill', colorCollection.butterfly);
});
// RUSHIA
rushiaPath.setAttribute('fill', colorCollection.rushia);
// NAMES
names.forEach((name) => {
	name.setAttribute('stroke', colorCollection.names);
	name.setAttribute('stroke-width', strokeThickness);
});
// NAMES UPPER
namesUpper.forEach((name) => {
	name.setAttribute('stroke', colorCollection.namesUpper);
	name.setAttribute('stroke-width', strokeThickness + 1);
});
// SHADOW
blurs.forEach((blur) => {
	blur.setAttribute('stroke', colorCollection.shadow);
});

//// View on browser after setup ////
document.querySelectorAll('svg').forEach((svg) => {
	svg.style.display = 'block';
});

const rushiaAnimation = () => {
	// Rushia Animation ////
	anime({
		targets: rushia,
		bottom: '-10%',
		delay: 4000,
		duration: 1000,
		easing: 'linear',
		complete: () => {
			const tlRushia = anime.timeline({
				loop: 6,
				delay: 800,
			});
			tlRushia.add({
				targets: rushia,
				bottom: '-5%',
				duration: 200,
			});
			tlRushia.finished.then(() => {
				anime({
					targets: rushia,
					bottom: '-75%',
					duration: 1000,
					easing: 'linear',
				});
			});
		},
	});
};

//// Timeline ////
const tl = anime
	.timeline({
		easing: 'easeInOutSine',
		duration: 500,
		loop: true,
		loopBegin: rushiaAnimation,
	})

	// Forward
	.add({
		targets: names,
		strokeDashoffset: [anime.setDashoffset, 0],
		delay: anime.stagger(400),
		duration: 800,
		complete: function () {
			console.log('NAMES');
		},
	})
	.add(
		{
			targets: butterfly.outer,
			strokeDashoffset: [anime.setDashoffset, 0],
			duration: 1200,
			complete: function () {
				console.log('BUTTERFLY OUTER');
			},
		},
		'-=200'
	)

	.add({
		targets: butterfly.inner,
		opacity: 1,
		duration: 1000,
		delay: 300,
		complete: function () {
			console.log('BUTTERFLY INNER');
		},
	})

	//// Standby Loop ////

	.add({
		targets: namesUpper,
		strokeDashoffset: [anime.setDashoffset, -65],
		duration: 1200,
		complete: function () {
			console.log('NAMES HIGHLIGHT');
		},
		endDelay: 1000,
	})

	//// Reverse ////
	.add({
		targets: namesUpper,
		strokeDashoffset: [-65, anime.setDashoffset],
		duration: 1000,
		complete: function () {
			console.log('NAMES HIGHLIGHT (REVERSE)');
		},
	})
	.add(
		{
			targets: names,
			strokeDashoffset: [0, anime.setDashoffset],
			duration: 1500,
			complete: function () {
				console.log('NAMES (REVERSE)');
			},
		},
		'-=1000'
	)
	.add(
		{
			targets: butterfly.inner,
			opacity: 0,
			duration: 200,
			complete: function () {
				console.log('BUTTERFLY INNER (REVERSE)');
			},
		},
		'-=1000'
	)
	.add(
		{
			targets: butterfly.outer,
			strokeDashoffset: [0, anime.setDashoffset],
			complete: function () {
				console.log('BUTTERFLY OUTER');
			},
			endDelay: 1000,
		},
		'-=1000'
	);
