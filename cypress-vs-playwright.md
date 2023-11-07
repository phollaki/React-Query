# Playwright vs Cypress

<table>
  <tr>
    <th></th>
    <th>Playwright</th>
    <th>Cypress</th>
  </tr>

  <tr>
    <td>Multiple language support</td>
    <td>✅</td>
    <td>❌</td>
  </tr>

  <tr>
    <td>Language support</td>
    <td>Java, JS/TS, Python, .NET</td>
    <td>JS/TS</td>
  </tr>

  <tr>
    <td>Browser non support</td>
    <td>IE</td>
    <td>IE, Safari</td>
  </tr>

  <tr>
    <td>Test generator</td>
    <td>✅</td>
    <td>❌</td>
  </tr>

  <tr>
    <td>Unpacked Size</td>
    <td>2.8MB 🤏🏻</td>
    <td>5MB</td>
  </tr>

  <tr>
    <td>GH issues</td>
    <td>713</td>
    <td>1324</td>
  </tr>

  <tr>
    <td>Execution time</td>
    <td>3,6s</td>
    <td>5s</td>
  </tr>

  <tr>
    <td>Code Length</td>
    <td>31 line</td>
    <td>47 line</td>
  </tr>

</table>

<style>
  table tr td {
    /* width: 100%; */
    text-align: center;
  }

</style>



### Playwright

**CodeGen:**
npx playwright codegen http://localhost:3000

**Test UI:**
npx playwright test --ui