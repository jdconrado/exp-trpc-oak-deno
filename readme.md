# Experiment: Dependency Injection, Modularized Structure, and Controller Support on Deno

This project is an experiment to explore the use of dependency injection, modularized structure, and controller support in a Deno application. The goal is to create a scalable and maintainable codebase using modern development practices.

> **Note:** This project is inspired by [NestJS](https://nestjs.com/).

## Features

- **Dependency Injection**: Manage dependencies efficiently and improve testability.
- **Modularized Structure**: Organize code into modules for better maintainability and scalability.
- **Controller Support**: Implement controllers to handle HTTP requests and responses.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/exp-trpc-oak-deno.git
    cd exp-trpc-oak-deno
    ```

2. Run the application:
    ```sh
    deno run --allow-net --allow-read mod.ts
    ```

## Project Structure

```
/controllers
    - userController.ts
/modules
    - userModule.ts
/services
    - userService.ts
mod.ts
```

- **/controllers**: Contains controller files to handle HTTP requests.
- **/modules**: Contains module files to define and configure modules.
- **/services**: Contains service files to handle business logic.
- **mod.ts**: The entry point of the application.

## Usage

Describe how to use the application, including example requests and responses.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
