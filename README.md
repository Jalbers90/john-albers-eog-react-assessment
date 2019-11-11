### To whom it may concern, thank you for giving me the oppurtunity to take this assessment
Quick summary of my experience with this, why I did what I did, and what could be better/known bugs. 

Experience: 
* Challenging but fun. Took a good chunk of time. 
* Though I am aware of and familiar with the major packages/libraries/technologies I have never used them for various reasons. Namely material-ui, graphql (and urql), redux-starter-kit, redux-saga, and typescript. Love to learn them though. 

Choices: 
* I opted to use a charting library (amcharts) I'm familiar with since the "getting started" did not come with one. It looks nice, easily customizable, easy to use, and performant. 
* Attempted to not "hard code" the metrics as much possible. Wanted to create a chart that could take any data following the api data structure
* Used plain js/react as I'm not familiar with typescript. Stuck to typescript where I could and had examples of. (thank you weather.tsx)
* I purposely stored the past 30 minutes of data and metric selection in chart-context rather than redux store. Conceptually I don't see them as 'global'. For example, if you could dynamically add/remove graphs they would be able to share the live data and list of metrics but the past data would need to be fetched (queried?) on demand to be more accurate. However I can see how it could be argued to be stored in redux. 
* Attempted to stick to given folder/file structure as much as possible. Unsure where to put subsciption logic. 
* Chart logic is way too messy. Went with it because it's library specific and outside the scope of the assessment. 

What's Good:
* Visually pleasing and laid out well (imo)
* Easy to use
* Performance seems to hold up even if all metrics are selected at the same time
* Performance seems to hold up for a good chunk of time with the live data
* zooming is fun
* deselct metrics from tags at top

What's Bad: 
* Visually unpleasing when zoomed in. Due to auto scaling axis' I think
* Not necessarily happy with how live updating is handled. Both state and update chart/tags wise
* Chart logic is way too messy. Went with it because it's library specific and kinda outside the scope of the assessment (imo)
* Known bug/error from amcharts causing a line to be plotted incorrectly (or at all). Seems to happen when selecting metrics very fast/randomly

