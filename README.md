# Cognittron
The Cognittron app is a differentiated course platform known for its visual maps and practical learning approach, aiming to reduce the dropout rate of traditional course platforms.
 
## Getting Started

### Prerequisites

- Node.js
- neo4j

### Installation

1. Clone the repository:
```shell
git clone https://github.com/Marcosh22/cognittron.git
```

2. Navigate to the project's root directory:
```shell
cd cognittron
```

3. Install dependencies:
```shell
npm install
```

### Running the Applications

1. Create .env file from template.env:
```shell
cp template.env .env
```

2. Enter enviroment variables for neo4j database credentials:
```shell
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=
```

3. Start development server:
```shell
npm run dev
```

5. Access the application in your browser at http://localhost:3000.


## Scripts

- `dev`: Run the in development mode.
- `build`: Build for production.
- `start`: Start the production build.
- `lint`: Lint the application code.
- `test`: Run tests.


## Technology Stack

- Remix
- Node.js
- Tailwind CSS
- TypeScript
- Jest