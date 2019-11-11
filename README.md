### To whom it may concern, thank you for giving me the oppurtunity to take this assessment
Quick summary of my experience with this, why I did what I did, and what could be better/known bugs. 

Experience: 
* Challenging but fun. Took a good chunk of time. 
* Though I am aware of and familiar with the major packages/libraries/technologies I have never used most of them for various reasons. Namely material-ui, graphql (and urql), and typescript. Love to learn them though. I use redux in my own work but haven't used starter-kit or saga. 

Choices: 
* I opted to use a charting library (amcharts) I'm familiar with since the "getting started" did not come with one. It looks nice, easily customizable, easy to use, and performant. 
* Attempted to not "hard code" the metrics as much possible. Wanted to create a chart that could take any data following the api data structure
* Used plain js/react as I'm not really familiar with typescript. Stuck to typescript where I could and had examples of. (thank you weather.tsx)
* Purposely stored the past 30 minutes of data and metric selection in chart-context rather than redux store.
* Attempted to stick to given folder/file structure as much as possible. Unsure where to put subsciption files/logic. 
* Chart logic is way too messy. Went with it because it's pretty specific to the chart library.  

What's Good:
* Visually pleasing and laid out well (imo)
* Easy to use
* Performance seems to hold up even if all metrics are selected at the same time
* Performance seems to hold up for a good chunk of time with the live data
* zooming is fun
* deselct metrics from tags at top

What's Bad: 
* Visually unpleasing when zoomed in. Due to auto scaling axis' I think
* LIve update logic could be handled better. Both state and update chart/tags wise
* Chart logic is way too messy. Went with it because it's charting library specific

what's ugly: 
* Known bug/error thrown by amcharts causing a line to be plotted incorrectly (or not at all). Seems to happen when selecting metrics very fast/randomly

