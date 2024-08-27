import Navbar from "@/components/navbar";
import Styles from "@/styles/sorab.module.css";
function Intro() {
  return (
    <>
      <h1>Currently Under Construction!</h1>
      <h2>Check back later.</h2>
      {/* <h2>Shades of Red and Blue</h2> <h3>Introduction</h3>
      <h4>
        Welcome to &quot;Shades of Red and Blue,&quot; a comprehensive and
        unbiased political quiz designed to delve deeply into the landscape of
        American politics. My project aims to provide a nuanced understanding of
        political ideologies by utilizing actual data to place individuals on a
        detailed spectrum.
      </h4>
      <h4>
        In the realm of political discourse, a &quot;political spectrum&quot;
        serves as a visual representation of diverse viewpoints. Unlike
        traditional models that rely on subjective interpretations, my approach
        is rooted in data-driven analysis. This spectrum is composed of various
        axes, each representing midpoints between opposing extremes, enabling a
        precise mapping of political stances. These axes define coordinates that
        uniquely characterize political entities, from individual citizens to
        major political groups and parties.
      </h4>
      <h4>
        The simplistic left-right spectrum, while globally recognized, often
        fails to capture the complexity of political beliefs. Alternative
        models, such as the Nolan Chart, introduce additional dimensions to
        better represent attitudes towards government control, ranging from
        libertarianism to totalitarianism. Despite their popularity, existing
        tools often rely heavily on intuition, leading to varied and sometimes
        inconsistent interpretations.
      </h4>
      <h4>
        My project, &quot;Shades of Red and Blue,&quot; addresses these
        inconsistencies by employing a more objective method. I leverage
        advanced techniques from machine learning and comprehensive data from
        political surveys to construct a political spectrum based on empirical
        evidence rather than subjective judgment.
      </h4>
      <h3>Methodology</h3>
      <h4>
        My methodology involves the use of data from the American National
        Election Survey (ANES) 2020 survey, a detailed political questionnaire
        conducted around the 2020 US Presidential election. This survey
        encompasses a wide range of features relevant to political views,
        including direct questions on policy preferences and demographic
        information.
      </h4>
      <h4>
        I apply Principal Component Analysis (PCA) to the ideological questions
        within the dataset. PCA helps in reducing the dimensionality of the
        data, allowing me to identify the principal components that explain the
        most variance in political ideology. By assigning appropriate weights
        derived from the dataset, I construct a more objective and precise
        political spectrum.
      </h4>
      <h3>Results</h3>
      <h4>
        The outcome of this analysis is a political quiz that accurately places
        individuals on the political spectrum based on empirical data. This tool
        provides a clearer, more reliable picture of political ideologies,
        helping users understand their own positions and those of others in a
        more informed manner.
      </h4>
      <h4>
        &quot;Shades of Red and Blue&quot; invites you to explore your place on
        the political spectrum through a lens of data-driven insights. Join me
        in uncovering the intricate shades of political belief and contribute to
        a more nuanced political discourse.
      </h4> */}
    </>
  );
}
export default function Sorab() {
  return (
    <main className={Styles.page}>
      <Intro />
    </main>
  );
}
