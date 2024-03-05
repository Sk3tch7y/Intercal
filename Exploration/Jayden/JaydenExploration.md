# Exploration

## Figma Prototype

I made a Figma prototype to visualize the software.
- https://www.figma.com/file/OsH6DzbTjmv8x9zHEnjl9p/waterlevelprototype?type=design&node-id=0%3A1&mode=design&t=Jhn5QWKNmiTjARJv-1



## Exploration of Javascript and React (and Material-UI )

### Rescources

I followed an online course that builds a react site from scratch.
- https://training.mammothinteractive.com/courses/1969926

Here is some code that captures most aspects I practiced. The layout is dynamic for mobile and desktop screens:

```js

import { Box, Container, Link, Toolbar, Typography, styled} from "@mui/material";
import React from "react";

const MenuToolbar = styled(Toolbar)(({theme}) => ({

    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    }
}));

const MenuTitle = styled(Typography)(({theme}) => ({

    fontWeight: "bold",
    fontSize: 40

}));

const MenuBox = styled(Box)(({theme}) => ({

    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row"
    }
}));

const MenuLink = styled(Link)(({theme}) =>({

    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3)
    }
}));

export default function NavigationBar() {
  
    return (
        <Container>
            <MenuToolbar>
                <MenuTitle>
                    My Company Name
                </MenuTitle>

                <MenuBox>
                    {['home','about','sign up'].map((menuOption) => (

                        <MenuLink
                            component='button'
                            variant="body1"
                        >
                            {menuOption.toUpperCase()}
                        </MenuLink>
                    ))}
                </MenuBox>

            </MenuToolbar>
        </Container>
    );
}

```
