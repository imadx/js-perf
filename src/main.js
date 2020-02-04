import StatusApp from './StatusApp.svelte';

const app = new StatusApp({
	target: document.getElementById('benchmark-stats')
});

document.addEventListener('DOMContentLoaded', () => {
	// Benchmark script's text area elements
	const benchmarkSetup = document.getElementById('benchmark-setup');
	const benchmark1 = document.getElementById('benchmark-script-1');
	const benchmark2 = document.getElementById('benchmark-script-2');

	// When the #benchmark-run button is clicked start the evaluation
	const actionButtonRun = document.getElementById('benchmark-run');
	const runEvaluation = () => {
		app.$set({ status: 'Starting benchmark execution...' });

		// Read the values from the textarea elements as strings
		// Cache the value as a function to be evaluated for the benchmark
		let functionSetup = new Function(benchmarkSetup.value);
		let function1 = new Function(benchmark1.value);
		let function2 = new Function(benchmark2.value);

		// Iterate the functions n times and track time
		const startTimes = [];
		const endTimes = [];

		const evaluateFunction = evaluatingFunction => {
			// Run the initialization function
			functionSetup();

			// Run the iterations and track the time spent
			startTimes.push(performance.now());
			for (let i = 0; i < 1000; i++) {
				evaluatingFunction();
			}
			endTimes.push(performance.now());
		};

		app.$set({ status: 'Starting benchmark execution...Started' });
		// Start the evaluations
		evaluateFunction(function1);
		app.$set({ completed: 1 });
		evaluateFunction(function2);
		app.$set({ completed: 2 });

		app.$set({ status: 'Calculating execution times...' });
		// Show the output on the benchmark-stats
		const executionStats = document.getElementById('benchmark-stats');
		const executionTime1 = endTimes[0] - startTimes[0];
		const executionTime2 = endTimes[1] - startTimes[1];

		// Update the times on the svelte StatusApp
		app.$set({ time1: executionTime1 });
		app.$set({ time2: executionTime2 });
		app.$set({
			status: 'Benchmark run complete. Click on `Run Benchmark` to run again'
		});

		requestAnimationFrame(() => {
			executionStats.scrollIntoView({ behavior: 'smooth' });
		});
	};

	actionButtonRun.addEventListener('click', runEvaluation);
});

export default app;
