# Coding Design Practices



## Planned patterns

### Abstract Factory pattern
As we are using react, it does heavily lean into this style for objects as each object created can be classed differently or built differently depending on the context. This Can be best seen in our info fragments, that all share the same design but contain different data. We chose to do this design pattern as it is most effective for code reusability and effectiveness in maintaining design standards

### Adapter Pattern
As we are dealing with an external api for our sensor data, we are relying heavily on the adaptation of data to fit cleanly into our functions and produce usable results. we decided to do this because by adapting the data we will be better able to visualize and manipulate it.

## Anti-pattern Avoidance Techniques/Practices
### Code Cleanliness and readability
    this refers to the ease of review and documentation of solutions

#### Never Nest 
    By never nesting beyond one or two nested levels, we can force our code to become more readable as a result. For example if statements inside of if statements inside of if statements are very useless, and can often be completely negated by using seperate more concise 

### Effective debugging
    effective debugging refers to the ease of determining faults in code. We can increase this with: 

#### Functional Programming
    By creating functions that can be named and properly tested we can cut down on large debugging tests simply by breaking every problem down to its core and testing each specific function. This helps us 

##### Functional programming also aids in restricting an objects functional access within memory, increasing security and preventing the creation of God Class Objects

### God Classes
    Refers to the creation of code that can do or knows too much. This is a probl;em because it decreases security and increases instability in a system. This is because if the class fails it brings the service down with it

### Functional programming
    Functional programming very much stands to aid in the destruction of God classes by emphasizing the usage of new classes for different functionality. Functional programmers are also know for killing God and space complexity with their practices, but with the correct time and place single purpose design practices create great software. Creating objects that are only used for a specific task, no general solutions

## Planned Pattern Usage

### Structural:

#### In addition to the design patterns listed in the Anti-design pattern avoidance techniques, these are the patterns we will employ in order to actively strive for great and consistent design. 

#### Creational: 
    For the creation of new objects in our webapp, we have decided to use factory practices in order to create object that can easily be manipulated by the Model View Controller model

#### Structural:
    For our Structural patterns we wanted to use a combination of MVC and component based architecture. The benefits of this approach being that data is secure and we can easily create general components that can easily be reused for any object we pass to it and in multiple views. 

#### Behavioral:

    For our behavior we have chosen to stick with a protocol stack, where communications are handled linearly in order to maintain stability and ease of maintenance. We thought this would work best as if we wanted to add more functionality the integrity of our data does not hinge on a system bringing it into the app expecting a certain format. We also have very little reason to obfuscate how our data is recieved or how the system functions.
 


