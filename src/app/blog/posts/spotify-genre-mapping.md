---
title: Making New Genres With The Spotify API
description: An excursion into unsupervised machine learning.
isPublished: true
publishedDate: 08/28/2024
tags:
  - apis
  - clustering
  - cosine-similarity
  - data-analysis
  - genre
  - music
  - tf-idf
  - umap
---

Spotify is one of the most popular services for music streaming, with [hundreds of millions of monthly users](https://www.demandsage.com/spotify-stats/) listening, liking, and saving their favorite songs. As such, they have a ridiculous amount of data at their disposal. One of the things they've decided to do with this data, along with their recommendation algorithm, is categorized music into [literally thousands of unique genres](https://newsroom.spotify.com/2022-11-30/learn-about-those-music-genres-you-may-not-have-heard-of/) based on clustering listening habits and music features. And while most people will roll their eyes at obscure terms like “Bronx Drill” or “Shoegaze”, this is arguably a valuable service given how nebulous music genres are. Terms like “rock” and “pop” have been spread out across extremely diverse types of music to the point of not even being useful anymore. But from Spotify's perspective, creating minuscule conceptual niches is probably mostly valuable for their marketing. If you're looking at your Spotify Wrapped, you see that you're a big fan of something that most people haven't even heard of, it gives you a sense of uniqueness and identity, which fosters engagement.

But these marketing strategies and their social consequences are not something I'm equipped to tackle. What I'm here to do is try to do some genre classification of my own, piggybacking off of the terabytes of listening data Spotify has collected from their users. And I hope that you'll enjoy the process and find the results as interesting as I did. You can find the code for this on my [GitHub](https://github.com/AbhilashaTandon/Spotify-Genre-Classifier) if you'd like.

### Step 0: Planning

One of the constraints I gave myself for this project is to not base this classification on any musical features of the songs themselves. What a song sounds like is the main thing people would think of when classifying music, and it's probably what Spotify puts the most weight on in their own classification. My strategy for this is to instead look at how people's music taste's correlate with one another. Conceptually, if two different musical artists share a common fan base, it's likely that there's some commonality between their music. Therefore, by seeing what artist's fan bases overlap, we can map out the spectrum of music listeners and group them into sections. A pretty useful way to do this is with people's playlists, since they are by their nature personalized. I also chose to classify artists by genre instead of, say, songs or albums. This was mostly done since individual songs by their sheer numbers are less likely to be repeated across different playlists, and artists are almost always confined to a single genre in their output anyway.

### Step 1: Getting the Data

Spotify's API service is honestly pretty amazing and perfectly well suited to this task. It's incredible that this is both free and easy enough to use, especially compared to other services (I'm looking at you, YouTube). For this project I used their [Search](https://developer.spotify.com/documentation/web-api/reference/search) tool to search for playlists, specifically using queries like “liked songs”, “favorite songs”, or “best songs”. I also limited the search to users in the United States, for a number of reasons:

1. Musical genre varies wildly across countries, and language barriers only exacerbate this. (You'll see how language barriers come up in the classification later). By limiting results to a specific country, this helps keep the range of artists more compact and makes it more likely that an artist will appear across a greater percentage of playlists in the sample.
2. The United States is a wealthy country where most people have some degree of internet access, meaning there's probably more Americans using the service than many other nations.
3. Since I am an American, I'll be able to tell if the algorithm is actually creating semantically reasonable clusters, since I know and have probably listened to a good number of the artists in the sample.

If you're from another country and reading this, I'd be extremely interested to see what this would look like for your country's music. Feel free to modify my code and show me the results.

This process took a while, especially given that Spotify's API keys expire after one hour (and I got rate limited a couple of times when debugging the output formatting, but let's put that aside), but overall it was pretty straightforward. Just get the artists for each song in each playlist. Though looking back, I wished I had used a proper database instead of just shoving all the data I got into a giant JSON file that I couldn't even open in VS Code without it lagging out on me. Wisdom for next time, I suppose.

### Step 2: TF-IDF

The first thing I did with the final data was to remove some less popular artists. I took the top 4000 most popular artists, sorted by how many, unique playlists their songs occurred in. This 4000 number is pretty arbitrary, but it works well for the specific size of the data I'm working with. This works better than sorting by raw number of songs in the sample, since it effectively tells us how many fans of the artist there are. There's not that much of a meaningful difference between having 10 of an artist's songs in your playlist and 100 of them.

I then took a technique very commonly used in NLP called [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) to weight the artists in the playlist. TF-IDF is typically used for word frequency among documents. The idea is to take a set of documents and convert their text into a matrix, with the number of rows being the number of documents and the number of columns being the unique words. Each entry of this matrix is then given a weight based on how much that word defines the semantic content of the document. This weight is a product of two different competing metrics: TF or term frequency, and IDF or inverse document frequency. The exact formulas used for these differ, but the most common is for TF to be the number of times the word appears in the document. IDF is usually the inverse of the number of unique documents in the sample the word occurs in. This allows a good measure of how meaningful a word is to a document, since if a document contains the word “the” 100 times, that probably means a lot less than if it contains the word “rutabaga” 100 times.

This can be applied to our problem if we consider playlists to be documents, and artists to be words. Note that for this task, I only consider the first artist that Spotify credits for a song. Otherwise, this ends up linking artists very closely if they've done a collaboration, and while this probably means they are similar in genre, tends to overshadow the main effect we're looking for. I tried this, and while it gave ok results for larger artists, there definitely were some outliers, and for smaller artists it didn't really have any idea what it was doing. I was able to fix this by removing term frequency entirely. It was replaced with a binary metric that indicates whether the artist appears in the playlist at all, similar to the method I used for removing rarer artists from the sample.

But now, we can take the TF-IDF matrix, and then create a new matrix to contain the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) between the columns, giving us an approximation of the genre distance between any two artists. This can already be used to obtain some interesting results, like say finding the artists that are most similar to a given other artist. Doing this for probably the most popular artist right now in my country, Taylor Swift, (hopefully this will give me some cheap SEO) gives us the following:

| Most Similar Artists to Taylor Swift | Cosine Similarity |
| ------------------------------------ | ----------------- |
| Olivia Rodrigo                       | 0.334             |
| Ariana Grande                        | 0.310             |
| Sabrina Carpenter                    | 0.284             |
| Harry Styles                         | 0.283             |
| Miley Cyrus                          | 0.282             |

This ends up making a lot of sense, a lot of other big pop stars are here, and especially ones with similar vibes: Harry Styles, Olivia Rodrigo, Sabrina Carpenter.

Now let's try with a little older artist, seeing who's most similar to Queen.

| Most Similar Artists to Queen | Cosine Similarity |
| ----------------------------- | ----------------- |
| AC/DC                         | 0.329             |
| Guns N' Roses                 | 0.290             |
| Bon Jovi                      | 0.277             |
| Journey                       | 0.265             |
| Survivor                      | 0.255             |

Ok, so a lot of classic rock, but more 80s, as opposed to something like The Beatles. Makes sense.

Now let's try some indie stuff with AJR.

| Most Similar Artists to AJR | Cosine Similarity |
| --------------------------- | ----------------- |
| BoyWithUke                  | 0.219             |
| Imagine Dragons             | 0.216             |
| Stellar                     | 0.208             |
| Panic! At The Disco         | 0.175             |
| Andy Grammer                | 0.173             |

Ok, it does feel kind of indie. We got some poppy stuff with Imagine Dragons and Andy Grammer which I think sort of fits.

Now let's go for an artist that's a bit esoteric (at least for this sample), Neutral Milk Hotel.

| Most Similar Artists to Neutral Milk Hotel | Cosine Similarity |
| ------------------------------------------ | ----------------- |
| Townes Van Zandt                           | 0.333             |
| Gregory Alan Isakov                        | 0.226             |
| Björk                                      | 0.218             |
| Kero Kero Bonito                           | 0.198             |
| Fleet Foxes                                | 0.198             |

Ok, it's kind of starting to break down here. I think there still are some common themes, Townes Van Zandt and Gregory Alan Isakov apparently tend to share NMH's melancholic vibe, but Björk and Kero Kero Bonito feel a bit too poppy IMO. I probably would have expected something more like Lumineers or some slower, more folksy stuff on this list.

### Step 3: Unfolding and Clustering

So, now we have a matrix that tells us the genre distance between any two artists that we give it. Our task now is to convert this distance matrix into a spatial representation that we can then use to cluster songs into genres. And for this we get to use probably my favorite algorithm in all computer science: [UMAP](https://pair-code.github.io/understanding-umap/). UMAP is an algorithm that allows conversion of a distance matrix into a spatial representation of its elements in any number of dimensions. This is useful both for reducing the dimensionality of highly complex datasets, and for visualizing data in a way that can show the relationships, clusters, and spectra of its elements. It also has much better performance than similar algorithms like T-SNE or MDS, and is inspired by absolutely beautiful ideas from topology.

But that’s not particularly relevant to the task at hand. The point is that it makes clustering easier and allows us to visualize our data. For clustering, I first transformed the data with UMAP into a 20 dimensional space and then used K-Means to cluster the reduced space into 10 genres. However there was a lot of variance between different iterations with different random states (or random initializations), so I switched to spectral clustering, which gave much more consistent results.

### Step 4: Results

As I said before, the choice of 10 as the number of clusters was somewhat arbitrary. I made sure to pick a suitably large number, but one that didn’t lead to clusters that felt hard to pin down, or that felt like they were splitting a single genre in two. For each of these clusters, I found their 10 most popular artists, just so we could see a broad overview of what the genre is like. Note here that the order doesn’t mean anything, and it actually randomly shuffles the order of the clusters for each run. Also note that some of the names I gave these were a bit sketchy, but I hope you’ll agree that the groupings make sense at least.

#### Cluster #1: Alt Rock

##### Linkin Park, Nirvana, Green Day, Radiohead, Metallica, Gorillaz, Red Hot Chili Peppers, Paramore, Foo Fighters, The Killers

I’m a bit too much of a hipster to call this “punk” (punk in my mind is Black Flag, Dead Kennedys, Against Me!, etc.). Perhaps “pop punk” could work, though I think alt-rock describes it better than either of those two. Metallica is the only artist in here that isn’t really alt-rock, but I’d say they fit in rather nicely.

#### Cluster #2: Indie

##### Arctic Monkeys, The Neighbourhood, Mitski, TV Girl, Melanie Martinez, Mac DeMarco, Mother Mother, The Living Tombstone, d4vd, Cavetown

This one is a bit harder to pin down. “Indie” is the best I could get, though “Indie Rock” would fit most of them more closely. One notable thing about these bands is that their demographic skews pretty young, and a number are very popular on social media.

#### Cluster 3: K-Pop

##### BTS, NewJeans, BLACKPINK, Jung Kook, FIFTY FIFTY, Stray Kids, ENHYPEN, TWICE, TOMORROW X TOGETHER, aespa

I don’t think this one needs much explanation. You’ve probably at least heard of at least a couple of these, even if you’ve never listened to them. This group is understandably sectioned off from other genres due to national and linguistic barriers, but still nonetheless happens to be popular enough in the US to make this list. Note that there are a couple of artists of other nationalities in here, most notable Vietnam. However I hesitated from labeling this group something like "East Asian Music" because non-Korean artists are less popular a small minority of the cluster, and also J-Pop is in a completely different section (it's part of the Indie cluster).

#### Cluster 4: South Asian Music

##### Pritam, A.R. Rahman, Vishal-Shekhar, Arijit Singh, Sachin-Jigar, Anirudh Ravichander, Tanishk Bagchi, Atif Aslam, Vishal Mishra, Darshan Raval

This group was very isolated from others, likely mostly due to language barriers, though notable less isolated than K-Pop. From my experience, it’s less popular outside of immigrant groups than K-Pop or Spanish language music for some reason.

#### Cluster 5: Contemporary Christian music

##### Hillsong UNITED, Elevation Worship, Hillsong Worship, TobyMac, Lauren Daigle, Chris Tomlin, for KING & COUNTRY, Bethel Music, Brandon Lake, Maverick City Music

This group was also one that was very isolated from all other artists, but notably not due to language barriers. Apparently, people who listen to this genre listen to very little outside of it. My lack of familiarity with it means I can’t say much about how accurate it is and if there are any obvious outliers.

#### Cluster #6: Hip Hop/Rap

##### The Weeknd, Drake, Eminem, Kendrick Lamar, Kanye West, Travis Scott, Tyler, The Creator, Juice WRLD, XXXTENTACION, Lil Uzi Vert

This group is pretty well-defined as well, and includes a pretty broad spectrum of artists. Nonetheless, it makes sense to me that the algorithm was able to identify it.

#### Cluster #7: Country

##### Morgan Wallen, Luke Combs, Zach Bryan, Jason Aldean, Luke Bryan, Rascal Flatts, Johnny Cash, Chris Stapleton, Thomas Rhett, Diplo

Again, not much to say here. The algorithm is doing pretty well.

#### Cluster #8: Spanish Language Music

##### Bad Bunny, KAROL G, J Balvin, Daddy Yankee, Eslabon Armado, Don Omar, Luis Fonsi, Becky G, Fuerza Regida, Peso Pluma

The Hispanosphere is known for having more musical diversity and unique genres than anyone could count (Reggaeton, Rumba, Salsa, Danzon, Bolero, Cha-cha-cha, Norteno, Tango, etc.), so it's a bit strange even if expected for it to be all under one group here. But I guess most Americans don't appreciate it much :(.

#### Cluster #9: Pop

##### Taylor Swift, Billie Eilish, Imagine Dragons, Post Malone, Ed Sheeran, Bruno Mars, Rihanna, Coldplay, Maroon 5, Ariana Grande

“Pop” is probably the most nebulous music term there is, followed by “rock”. However, I still think pop is an apt label for this cluster. You might think that some of them should be classified as rock, like “Imagine Dragons” or “Maroon 5”, but if you did, you’d be wrong.

#### Cluster #10: Classic Rock

##### Queen, Elton John, The Beatles, AC/DC, Michael Jackson, Billy Joel, Bon Jovi, Guns N' Roses, Fleetwood Mac, ABBA

Ahh, we’ve saved one of the best for last. At least according to my taste. This is honestly the only group here where I can say I like every single artist listed, except for The Beatles (sorry, not sorry). You could classify ABBA as disco, but sadly, disco is not popular enough to make it into the top 10 genres.

### Step 5: Projection

One last thing before I stop rambling about this project. I think it's interesting to see what these genres look like if you plot them using UMAP in 2 dimensions. Take a look!

<iframe src="/blog/spotify-genre-mapping/embed" class="embed" height="512" width="1024" />
