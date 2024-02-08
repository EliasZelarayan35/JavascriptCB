# Selenium Test Script Readme

This repository contains a Selenium test script written in JavaScript that performs a basic test on Wikipedia using various browsers. The script incorporates several design patterns and logging features for test execution.

## Features

- Utilizes the Page Object design pattern for better test maintenance and readability.
- Implements the Factory design pattern for creating driver instances, supporting Chrome, Firefox, and Edge browsers.
- Uses the Singleton pattern for managing driver instances, ensuring only one instance is created per browser session.
- Default browser is set to Chrome if not specified otherwise.
- Maximizes the browser window upon opening.
- Logs each step of the test execution along with corresponding screenshots for better debugging and reporting.
- Saves test results in a designated folder named "TestResults".

## Prerequisites

- Node.js installed on your machine.
- Dependencies: `selenium-webdriver`, `chrome`, `firefox`, `edge`, `fs`, `path`, `uuid`.

## Usage

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Run the test script using `node script.js`.

## Test Execution

The test script executes a basic test on Wikipedia, performing the following steps:
1. Open Wikipedia website.
2. Search for the term "elias".
3. Verify that the results page is reached.

Upon completion, the test results are logged in a file named according to the test name and timestamp within the "TestResults" folder.

## File Structure

- `script.js`: The main JavaScript test script containing the test logic.
- `TestResults/`: Folder containing the test result logs and screenshots.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
