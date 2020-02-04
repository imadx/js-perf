<script>
  export let status = "Waiting for the benchmark to be executed";
  export let completed = 0;
  export let total = 2;

  export let time1 = 0;
  export let time2 = 0;

  $: isFirstFaster = time1 <= time2;
  $: firstRatio = time2 / time1;
</script>

<h3>
  Status
  <span>{status}</span>
</h3>
<div>{completed} of {total} scripts completed</div>

{#if time1 && time2}
  <table>
    <tr>
      <th>Script</th>
      <th>Time elapsed</th>
      <th />
    </tr>
    <tr>
      <td>Benchmark script 1</td>
      <td
        class={isFirstFaster ? 'faster' : 'slower'}
        style="--inner-width: {isFirstFaster ? (time1 / time2) * 100 : 100}px">
        {time1.toFixed(2)}s
      </td>
      <td class={isFirstFaster ? 'faster' : 'slower'}>
        {Math.floor(firstRatio * 100) / 100}x {isFirstFaster ? 'faster' : 'slower'}
      </td>
    </tr>
    <tr>
      <td>Benchmark script 2</td>
      <td
        class={!isFirstFaster ? 'faster' : 'slower'}
        style="--inner-width: {!isFirstFaster ? (time2 / time1) * 100 : 100}px">
        {time2.toFixed(2)}s
      </td>
      <td class={!isFirstFaster ? 'faster' : 'slower'}>
        {Math.floor((1 / firstRatio) * 100) / 100}x {!isFirstFaster ? 'faster' : 'slower'}
      </td>
    </tr>
  </table>
{/if}
