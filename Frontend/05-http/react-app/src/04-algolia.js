import React from "react";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    let doWeStillCareAboutResponse = true;

    fetch("https://hn.algolia.com/api/v1/search?query=" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(dataFromBackend => {
        if (doWeStillCareAboutResponse === true) {
          setArticles(dataFromBackend.hits);
        }
      });

    function cleanupEffect() {
      doWeStillCareAboutResponse = false;
    }

    return cleanupEffect;
  }, [inputValue]);

  return (
    <>
      <input
        onChange={e => {
          setInputValue(e.target.value);
        }}
      />
      {articles.map(article => (
        <div>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </div>
      ))}
    </>
  );
}
