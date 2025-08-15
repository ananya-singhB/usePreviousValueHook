
# **usePreviousValue React Hook**

# **Problem Statement**
A minimal hook to manually snapshot a "previous" value only when desired (e.g., on submit), instead of auto-tracking every change like `usePrevious(value)`.

## **🧪 Test Behavior**

- Type a name in the input field and click **"Submit"**.
  - **Current name** shows the typed value.
  - **Previous name** remains **"N/A"** on the first submit.
- Type a different name and click **"Submit"** again.
  - **Current name** updates to the new value.
  - **Previous name** shows the value from the prior submit.
- Repeat as needed:
  - **Previous name** always lags one submit behind **Current name**.
- Additional checks:
  - Changing the input without submitting does **not** change **Previous name**.
  - Submitting the same value twice sets **Previous name** to that same value on the next submit.

---

### Install dependencies
```
npm install
```

### Start the development server
```
npm start
```

### Run tests
```
npm test
```