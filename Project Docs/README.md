# Intercal
 COSC310 Group project  
Group Members:  
- Adam Badry
- Oakley Pankratz
- Nick kouwenhoven
- Jayden Jayawardhena  

## Project Descciption: 
Our Group goal with this prject is to help make a useful research tool for people looking into water levels in canadian lakes and rivers. By using evironment Canadas data, and creating a tool to visualize data, and track lake performance in real time and flag potential issues with lake levels. 

## User Requirements:

- Search for lakes based on ID or lake levels
- View Lake data
- View Lake predictions
- Allow users to add lakes to their dashboard
- Allow Admin to flag lakes in the database
- Allow Users to create Accounts

## System Requirements

### Functional Requirements:

- Query the database for lakes with specific Id's or water level ranges
- Display current lake data within a dashboard citing the monitoring posts it sources
- Display Average lake levels within a specific time period to estimate the levels for a year
- link lakes to a users dashboard within the database so it is saved between devices not just on the client
- Allow Admin to assign a flag to lakes out of acceptable values within a database
- Add users to databases according to their input


### Non-Functional Requirements

- The system must Store and organize water level data
- predictions must be processed on the client-side
- data visualization happens on the client side
- maintain Flagged lakes and monitoring posts
- Store Users, and user dashboards on the server
- respond to queries in a reasonable amount of time
- link to sourced data for visualization and predictions and previous years, to openly display facts


## User Use Case Diagram:

![alt text](useCaseDiagram.png)
  
## UML Data Diagram:

![Alt Text](Uml%20Data%20Diagram.png)
  
## UML Class Diagram:

![alt text](umlClass.png)

## Data Flow Diagram:

![Alt text](DataFlowDiagram.png)
