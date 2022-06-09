import React from "react";
import Navigation from "./Navigation";
import Provider from "../context/provider";

const About = () => {
    return (
        <Provider>
            <div>
                <Navigation />
                <h1 style={{textAlign:"center", margin:"50px"}}>About us</h1>
                <p style={{padding:"50px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium, lorem sed mollis interdum, urna metus pulvinar massa, at volutpat quam ex ullamcorper dui. Ut interdum blandit mauris id ullamcorper. Integer non sapien vel nulla cursus bibendum. Proin scelerisque, velit quis molestie malesuada, elit elit pretium turpis, nec bibendum erat justo sit amet justo. Pellentesque iaculis mauris sed lorem porta, eu fermentum tortor semper. Praesent placerat odio id tellus tempus tincidunt. Aliquam varius enim ut venenatis tempor. Proin pretium id lacus at viverra. Ut finibus iaculis nisi, ac venenatis sem rutrum sit amet. Cras rutrum turpis mi, at pharetra lorem fermentum facilisis. Nulla imperdiet nibh semper leo malesuada pretium. Sed vitae tempor leo. Praesent imperdiet massa a felis vehicula luctus. Praesent porta auctor sem, sit amet elementum nisi eleifend a.</p>
            </div>
        </Provider>

    )
}

export default About;