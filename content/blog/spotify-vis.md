---
title: Making New Genres With the Spotify API
excerpt: An excursion into unsupervised machine learning.
active: true
date: 07/14/2026
image: spotify_artist_visualization.png
alt: 
 tags:
  - apis
  - machine-learning
  - data-analysis
  - music
slug: spotify-vis
---

Spotify is currently the [world's most popular music streaming service](https://explodingtopics.com/blog/music-streami) by a wide margin, with [hundreds of millions of users](https://www.demandsage.com/spotify-stats/) streaming, liking, and saving their favorite songs. Because of this, Spotify has an enormous amount of data on music listening habits at its disposal. One of the things they’ve decided to do with this data is create [hundreds of “microgenres”](https://newsroom.spotify.com/2022-11-30/learn-about-those-music-genres-you-may-not-have-heard-of/) to obsessively categorize the ever-changing music landscape into terms like “Bronx Drill” or “Shoegaze”. This is very advantageous for them because then they can put these terms in Spotify Wrapped, which gives Spotify users a sense of individuality and uniqueness for listening to an obscure genre.

But today I'm not going to talk about how Spotify influences the music industry through user listening habits. Instead, I’d like to piggyback on Spotify’s terabytes (honestly, probably petabytes) of listening data to do my own genre analysis and see what I can come up with. I used Spotify’s API for this, and you can look through the code on [GitHub](https://github.com/AbhilashaTandon/Spotify-Genre-Classifier) if you’d like. Unfortunately, my code won’t work without modification, since I fetched the data over a year ago, when Spotify’s API was much more lenient. I believe you need a premium account to use it now. I may consider getting one to collect more data, but that will have to wait until later.

## Step 0: Planning

In planning out this project, I decided to give myself one major constraint: my classification completely ignores any musical characteristics of the songs themselves: tempo, key, instrumentation, length, etc. It only looks at which users like which songs. This is a bit counterintuitive: the main thing most people use to judge a song's genre is how it sounds. But users’ musical tastes are often confined to specific genres. If two artists have similar styles of music, the same people who listen to one artist will likely listen to the other. This ended up giving interesting results, as many artists that don’t appear similar at first glance have very similar fan bases, and I think exploring the results was much more interesting than if I had incorporated musical characteristics into my analysis. It does, however, have a couple of issues, which we will get to later.

## Step 1: Getting the Data

My first step in data collection was to search for user-created playlists containing songs they like. I wanted to use users' liked songs for this, but I couldn't find a way to get this data from the API, which is understandable since that information seems more private. Thankfully, many users create playlists of songs they like to share with others, often containing thousands of tracks. I used Spotify's search tool to search for playlists with titles such as "liked songs", "favorite songs", "best songs", etc. It's important to note that this introduces bias into the dataset because certain demographics are more likely to create playlists to share their music with others. We'll see later that some artists seem to appear more often than they should in the dataset, and this could be a possible explanation.

I also chose to limit the search to playlists created by users in the United States for 3 main reasons.

1.  Musical genre varies wildly across countries, and language barriers only exacerbate this. (You'll see how language barriers come up in the classification later). By constraining playlists to a specific country, we keep genre diversity more compact and make it more likely that an artist will appear in a greater percentage of playlists in the sample.
2.  The United States is a wealthy country where most people have some degree of internet access, meaning there are probably more Americans using the service than in many other nations.
3.  Since I am an American, I'll be able to tell if the algorithm is actually creating semantically reasonable clusters, since I know and have probably listened to a good number of the artists in the sample.

If you're from another country and reading this, I'd be extremely interested to see what this would look like for your country's music. Feel free to modify my code and show me the results.

This process took a while (and I got rate-limited a couple of times when debugging the output formatting, but let's put that aside), but overall it was pretty straightforward. I was able to collect 6,159 playlists, containing 151,284 unique songs from 36,468 unique artists.


## Step 2: TF-IDF

The first thing I did with the final data was to remove some less popular artists. I took the top 5000 most popular artists, sorted by the number of unique playlists their songs occurred in. This 5000 number is pretty arbitrary, but it works well for the specific size of the data I'm working with. All of these artists appear in at least 5 distinct playlists. This method works better than sorting artists by their raw number of songs in the sample; it effectively tells us how many fans the artist has. There's not that much of a meaningful difference between having 10 of an artist's songs in your playlist and 100 of them.

I then used a technique common in NLP called [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) to weight the artists in the playlist. TF-IDF is typically used to compute word frequency in a set of documents. The idea is to take a set of documents and convert their text into a matrix, with the number of rows as the number of documents and the number of columns as the unique words. Each entry of this matrix is then given a weight based on how much that word defines the semantic content of the document. This weight is a product of two competing metrics: TF (term frequency) and IDF (inverse document frequency). The exact formulas used for these differ, but the most common is to let TF be the number of times the word appears in the document. IDF is usually the inverse of the number of unique documents in the sample in which the word occurs. This gives a good measure of how meaningful a word is to a document, since if a document contains the word “the” 100 times, that probably means much less than if it contains the word “rutabaga” 100 times.

We can use this technique if we think of playlists as documents and artists as words in those documents. Note that for this task, I only consider the first artist that Spotify credits for a song. Otherwise, this ends up linking artists very closely if they've collaborated. And while this probably means they are similar in genre, it tends to overshadow the main effect we're looking for. I tried this, and while it gave ok results for larger artists, there were some outliers, and for smaller artists, it didn't really have any idea what it was doing. I was able to fix this by removing term frequency entirely. It was replaced with a binary metric of whether the artist appears in the playlist at all, similar to the method I used to remove rarer artists from the sample.

But now, we can take the TF-IDF matrix and create a new matrix with the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) between the columns, giving us an approximation of the distance between any two artists. We can already use this to obtain interesting results, like finding the artists most similar to another artist. Let's see how this works for our most popular pop artist: Taylor Swift.

| Most Similar Artists to Taylor Swift | Cosine Similarity |
|:------------------------------------:|:-----------------:|
| Olivia Rodrigo                       | 0.334             |
| Ariana Grande                        | 0.310             |
| Sabrina Carpenter                    | 0.284             |
| Harry Styles                         | 0.283             |
| Miley Cyrus                          | 0.282             |

I don't listen to Taylor Swift or any of these other artists, but given what I hear from Swifties in my life, it seems like our algorithm is doing pretty well here, except for maybe the inclusion of Miley Cyrus. 

Now, let's try out the most popular classic rock artist: Queen, which should give us a pretty different listener demographic. 

| Most Similar Artists to Queen | Cosine Similarity |
|:-----------------------------:|:-----------------:|
| AC/DC                         | 0.329             |
| Guns N' Roses                 | 0.290             |
| Bon Jovi                      | 0.277             |
| Journey                       | 0.265             |
| Survivor                      | 0.255             |

A lot of 80's stuff. Makes perfect sense. 

Now let's try some more medium-sized artists, at least according to their popularity in our sample (we see a little bit of the aforementioned sampling issues here)

| Most Similar Artists to Jimmy Eat World | Cosine Similarity |
|:---------------------------------------:|:-----------------:|
| The All-American Rejects                | 0.258             |
| Good Charlotte                          | 0.249             |
| The Offspring                           | 0.203             |
| Underoath                               | 0.196             |
| Bowling For Soup                        | 0.196             |


| Most Similar Artists to Skrillex | Cosine Similarity |
|:--------------------------------:|:-----------------:|
| FISHER                           | 0.229             |
| Fred again..                     | 0.185             |
| Kx5                              | 0.184             |
| NERO                             | 0.174             |
| D.O.D                            | 0.168             |


| Most Similar Artists to mxmtoon | Cosine Similarity |
|:-------------------------------:|:-----------------:|
| Beach Bunny                     | 0.221             |
| Sofia Mills                     | 0.189             |
| Cavetown                        | 0.187             |
| Brye                            | 0.183             |
| Egg                             | 0.183             |


| Most Similar Artists to Outkast | Cosine Similarity |
|:-------------------------------:|:-----------------:|
| JAY-Z                           | 0.211             |
| Eazy-E                          | 0.205             |
| The Notorious B.I.G.            | 0.194             |
| Kanye West                      | 0.188             |
| Soulja Boy                      | 0.188             |


| Most Similar Artists to Toby Fox | Cosine Similarity |
|:--------------------------------:|:-----------------:|
| Omori                            | 0.248             |
| The Living Tombstone             | 0.230             |
| Xguiz                            | 0.220             |
| Jack Stauber's Micropop          | 0.214             |
| Lena Raine                       | 0.210             |


Ok, I will admit my knowledge of music is a bit limited, so I'll mostly be consulting Wikipedia, but I don't think there are any major outliers. 

- Jimmy Eat World and co. are considered pop-punk, emo pop, alternative rock, power pop, and pop rock, except for Underoath, which is a metal band.
- Skrillex and co. are house, electronic, techno, and dubstep, which I consider to be basically all the same genre, though I'm sure some people would yell at me for saying so.
- mxmtoon, Beach Bunny, and Cavetown are bedroom pop or indie pop. I can't find the others on Wikipedia, but I do listen to Egg, and I'd say they fit in well.
- Outkast and co. include some famous 90's gangsta rap artists: B.I.G, Eazy-E, along with some more modern artists like JAY-Z and Kanye.
- Omori and Lena Raine are also VGM artists, and the inclusion of Jack Stauber and The Living Tombstone also makes sense to me. However, I can't find any information on who Xguiz is. 

 ## Step 3: Reducing Dimensionality

So, now we have a matrix that tells us the genre distance between any two artists that we give it. Our task now is to cluster our artists into distinct genres. But before clustering our artists, I chose to reduce the dimensionality of our dataset. The dimensionality of a data point can be thought of as the number of individual numbers needed to describe it. Currently, to describe the genre of an artist, we have to look at their similarity to every other artist in the sample, meaning the dimensionality is just the number of artists in the sample, 5000. This is useful for directly comparing two artists, but it doesn't give an overall picture of the genre landscape and is difficult to use in clustering. If we can reduce dimensionality, our clustering algorithm will give us better results. 

I decided to reduce the dimensionality of our data by using my favorite algorithm in all of computer science: UMAP. UMAP is an algorithm that converts a distance matrix into a spatial representation of its elements in any number of dimensions. This is useful both for reducing the dimensionality of highly complex datasets and for visualizing data to show the relationships, clusters, and spectra of its elements. Doing this before clustering is the real magic of this approach and really helps improve the quality of the results. I applied UMAP to our dataset to reduce its dimensionality to 10, and then applied spectral clustering to get our unique genres. 

## Step 4: Clustering

First, I tried grouping the artists into 10 genres. This is admittedly an arbitrary number, so I tried other higher values, but unfortunately these gave worse results. First I'll discuss the 10 genre split, and then the shortcomings of this approach as I tried to generate larger numbers of genres.

### 10 Genre Split

#### Cluster #1: Alt Rock

##### Linkin Park, Nirvana, Green Day, Radiohead, Metallica, Gorillaz, Red Hot Chili Peppers, Paramore, Foo Fighters, The Killers

I’m a bit too much of a hipster to call this “punk” (punk in my mind is Black Flag, Dead Kennedys, Against Me!, etc.). Perhaps “pop punk” could work, though I think alt-rock describes it better than either of those two. Metallica is the only artist in here that isn’t really alt-rock, but I’d say they fit in rather nicely.

#### Cluster #2: Indie

##### Arctic Monkeys, The Neighbourhood, Mitski, TV Girl, Melanie Martinez, Mac DeMarco, Mother Mother, The Living Tombstone, d4vd, Cavetown

This one is a bit harder to pin down. “Indie” is the best I could get, though “Indie Rock” would fit most of them more closely. One notable thing about these bands is that their demographic skews pretty young, and some are very popular on social media.

#### Cluster 3: K-Pop

##### BTS, NewJeans, BLACKPINK, Jung Kook, FIFTY FIFTY, Stray Kids, ENHYPEN, TWICE, TOMORROW X TOGETHER, aespa

I don’t think this one needs much explanation. You’ve probably at least heard of a couple of these, even if you’ve never listened to them. This group is understandably sectioned off from other genres due to national and linguistic barriers, but still happens to be popular enough in the US to make this list. Note that there are a couple of artists of other nationalities in here, most notably Vietnam. However, I hesitated from labeling this group something like "East Asian Music" because non-Korean artists are a small minority of the cluster. Also, J-Pop is in a completely different section (it's part of the Indie cluster).

#### Cluster 4: South Asian Music

##### Pritam, A.R. Rahman, Vishal-Shekhar, Arijit Singh, Sachin-Jigar, Anirudh Ravichander, Tanishk Bagchi, Atif Aslam, Vishal Mishra, Darshan Raval

This group was very isolated from others, likely mostly due to language barriers, though notably less isolated than K-Pop. From my experience, it’s less popular outside of immigrant groups than K-Pop or Spanish-language music for some reason.

#### Cluster 5: Contemporary Christian music

##### Hillsong UNITED, Elevation Worship, Hillsong Worship, TobyMac, Lauren Daigle, Chris Tomlin, for KING & COUNTRY, Bethel Music, Brandon Lake, Maverick City Music

This group was also one that was very isolated from all other artists, but notably not due to language barriers. Apparently, people who listen to this genre listen to very little outside of it. My lack of familiarity with it means I can’t say much about its accuracy, and whether there are any obvious outliers.

#### Cluster #6: Hip Hop/Rap

##### The Weeknd, Drake, Eminem, Kendrick Lamar, Kanye West, Travis Scott, Tyler, The Creator, Juice WRLD, XXXTENTACION, Lil Uzi Vert

This group includes a pretty broad spectrum of artists. Nonetheless, it's still well defined, and it makes sense to me that the algorithm was able to identify it.

#### Cluster #7: Country

##### Morgan Wallen, Luke Combs, Zach Bryan, Jason Aldean, Luke Bryan, Rascal Flatts, Johnny Cash, Chris Stapleton, Thomas Rhett, Diplo

Again, not much to say here. The algorithm is doing pretty well.

#### Cluster #8: Spanish Language Music

##### Bad Bunny, KAROL G, J Balvin, Daddy Yankee, Eslabón Armado, Don Omar, Luis Fonsi, Becky G, Fuerza Regida, Peso Pluma

Again, likely isolated from other groups due to linguistic and cultural barriers, but less so than South Asian music. 

#### Cluster #9: Pop

##### Taylor Swift, Billie Eilish, Imagine Dragons, Post Malone, Ed Sheeran, Bruno Mars, Rihanna, Coldplay, Maroon 5, Ariana Grande

“Pop” is probably the most nebulous music term there is, followed by “rock”. However, I still think pop is an apt label for this cluster. You might think that some of them should be classified as rock, like “Imagine Dragons” or “Maroon 5”, but if you did, you’d be wrong.

#### Cluster #10: Classic Rock

##### Queen, Elton John, The Beatles, AC/DC, Michael Jackson, Billy Joel, Bon Jovi, Guns N' Roses, Fleetwood Mac, ABBA

This group is not terribly well-defined outside of the artists listed: it includes basically every artist from the 20th century regardless of genre, but classic rock is the plurality. This is honestly the only group here where I can say I like every single artist listed, except for The Beatles.

### 50 Genre Split

This is where things start to fall apart with this approach. While only splitting the sample into 10 genres worked just fine, 50 genres tends to produce less intuitive groupings. I suspect this is because of some of the previously mentioned issues, such as biases in the sample or the sample size simply being too small. I'd say the results are rather mixed. For example, here's the genre out of the 50 with the most artists. 

##### #1: Taylor Swift, Imagine Dragons, Post Malone, Ed Sheeran, Bruno Mars, Rihanna, Coldplay, Maroon 5, Ariana Grande, OneRepublic

Very obviously mainstream pop music. It's really similar to the pop genre from the 10-artist split, though missing Billie Eilish and including OneRepublic. 

The second largest genre is also pretty sensible:

##### #2: Drake, Kendrick Lamar, Kanye West, Travis Scott, Juice WRLD, XXXTENTACION, Lil Uzi Vert, J. Cole, Future, 21 Savage

Again, very similar to the Hip Hop genre from the 10 genre split.

However, here are the top 10 from the third largest genre.

##### #3: Lana Del Rey, Fall Out Boy, NF, Alec Benjamin, Conan Gray, Lewis Capaldi, James Arthur, AJR, Vance Joy, Ruth B.

I'm not really sure what's going on here. I hope most people would agree that Lana Del Rey and Fall Out Boy are not the same genre. There is some calmer, slower pop in this list, but weirdly, also AJR.

With genre four we do a bit better, but it all falls apart with five and six.

##### #4: Queen, Elton John, The Beatles, AC/DC, Billy Joel, Bon Jovi, Guns N' Roses, Fleetwood Mac, The Rolling Stones, Aerosmith

##### #5: Arctic Monkeys, The Neighbourhood, Mitski, TV Girl, Mac DeMarco, d4vd, Laufey, Joji, girl in red, Clairo 

##### #6: Melanie Martinez, Mother Mother, Cavetown, MARINA, Jack Stauber's Micropop, Tally Hall, Penelope Scott, Lemon Demon, Bo Burnham, Mindless Self Indulgence

Number four is pretty obviously classic rock, but we've lost the plot with five and six. 

The size of the genre doesn't seem to affect the quality of the grouping. For example, this is genre #40, and I have to include all the artists here because this list gets worse and worse the farther you go down.

##### #40: Grover Washington, Jr., Hans Zimmer, Robbie Williams, John Williams, Ryan Gosling, Danny Elfman, Various Artists, Enya, Engelbert Humperdinck, Michael Giacchino, Matthew Wilder, Andrew Gold, Ray Parker Jr., John Powell, Nena, Sarah McLachlan, Joe Hisaishi, Miracle Of Sound, The Longest Johns, The Piano Guys, Klaus Badelt, Tegan and Sara, Vitamin String Quartet, Justin Hurwitz, Antonio Vivaldi, Parry Gripp, James Newton Howard, Pyotr Ilyich Tchaikovsky, Raffi, Yiruma, Ricky Desktop, The Citizens of Halloween, Alan Silvestri, Kevin MacLeod, Wolfgang Amadeus Mozart, VeggieTales, Spongebob Squarepants, Thomas Bergersen, Pinkfong, Super Simple Songs, Bobby McFerrin, The High Kings, Wind Rose, The Dead South, アトラスサウンドチーム, Ennio Morricone, Ramin Djawadi, Mick Gordon, Howard Shore, Traditional

(Yes, "Various Artists" isn't a real artist; I just forgot to filter that out of the sample. Shut up.)

I can't say for sure, but I'm pretty sure Antonio Vivaldi would be rolling in his grave to be considered the same genre as SpongeBob SquarePants, Danny Elfman, and VeggieTales, if we first explained to him who/what those were. (No shame to those three, I'd unironically enjoy listening to them in my spare time.)

However, genre #44 isn't too bad.

##### #44: Dove Cameron, Mandy Moore, Will Smith, Idina Menzel, Auli'i Cravalho, Lea Salonga, Sofia Carson, Naomi Scott, Carolina Gaitán - La Gaita, Donny Osmond, Kristen Bell, Dwayne Johnson, China Anne McClain, Randy Newman, Jason Weaver, Samuel E. Wright, Anika Noni Rose, Jodi Benson, Anthony Gonzalez, Amy Adams, Angela Lansbury, Julie Andrews, Nathan Lane, Jessica Darrow, Stephanie Beatriz, Mark Keali'i Ho'omalu, High School Musical Cast, Grace Potter, Susan Egan, Julie Fowlis, Alan Menken, Carmen Twillie, Judy Kuhn, Ariana DeBose, 4*TOWN (From Disney and Pixar’s Turning Red), Lily James, Halle, Richard White, Ilene Woods, Milo Manheim, 98º, Jon Batiste, Mena Massoud, Diane Guerrero, Sarah Jeffery, Coco Jones, Verna Felton, Cliff Edwards, Opetaia Foa'i, Pat Carroll

I'll call this "Disney(Channel)Core". I'm glad I could at least make up one stupid genre name for this project.

## Step 5: Visualization

Finally, I decided to perform UMAP again, but use only two dimensions as output, to make a chart of sorts, and I think this really shows the strengths and weaknesses of this approach more clearly. You can check it out for yourself [here](https://abhilashatandon.com/projects/spotify_artists/). I find it's a pretty useful tool for discovering new music, and it's also just really interesting to browse around the chart and see all the little niches it's able to find. Of course, the issues explained
above are also present, so take some of the correlations here with a heavy grain of salt. Have fun exploring!
