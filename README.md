# Fallout-4-Terminal

The Fallout 4 interactive terminals as a website. We're not talking about the "hacking" stuff present in the game (that was already done by someone else and isn't actually interesting to use), we're talking about the part of the terminals where the player can read log entries and control turrets and doors, for example.

## How to build your own holotapes

The whole project is just some basic HTML page, no backend language needed. Take a look at the holotapes folder, you'll find some examples there.

To load a holotape, call
>loadHolotape("name_of_holotape");

That's already done in terminal.js in the fourth line to load a starting holotape.

There are a bunch of functions you can use in your holotapes to interact with the terminal:

>clr();
clears the screen.

>println("some text");
prints some text to the terminal. Note that this doesn't clear the screen, it just appends the line.

>menuln("some text","function","prefunction");
creates a menu entry in the terminal. The text is the text of the entry, the function the name of the function in the holotape being called which then prints the page, and prefunction being an optional function in the holotape that's called before calling the function. To be specific, the prefunction is called, then it's output is passed to the function. An example:
You want a menu entry that, once selected, shows a status screen. When printing your page, you call
>menuln("Check system status","systemStatus");
Once clicked, it'll call the current holotape's function "systemStatus" which then prints some data.
Let's say you want a menu entry that, once selected, toggles a lamp and then shows the status screen. You'd call something like this:
>menuln("Check system status","systemStatus","toggleLamp");
This time, instead of directly calling systemStatus, it'd first call the current holotape's "toggleLamp" which then returns the state of the lamp after toggling it. This value (which you could be "on" or 1 or some lamp object - that's up to you) is then passed to systemStatus which can use that data to print something interesting.
You can see the second example in vergil.js in lightControl(). I planned to use more complex menus more often for controlling my smarthome, but honestly, there are more aesthetically pleasing options compared to the Fallout terminals.

>printState("Something");
prints a small line of info on the bottom line of the terminal (the one with the >).

Other than that, you can decide on what page is called when the user presses tab (which in Fallout 4 is the back button for a page) and what page is called when the user clicks somewhere after the page is printed fully. You do this by returning an array with the name of the page you want to end up in each case. Exmaple:
>return ["backPage","nextPage"];
When the user presses tab here, they'll end up at backPage. When they click somewhere to go to the next page, they'll end up at nextPage. This is pretty useful for several pages of info that you can't print on a single one. If you don't want them to go to any next page, return ["backPage",""] instead. You can also choose to omit any return value, which will result in no tab or click pages at all.
