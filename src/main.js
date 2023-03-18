const PT_BR = "pt-BR";
const EN_US = "en-US";
const USER_DEFAULT_LANG =
  (navigator.language || navigator.userLanguage) ?? PT_BR;

const i18nTemplate = {
  [PT_BR]: {
    initialText: `<p>o que é sucesso, ou quantas tentativas são preciso para acertar?</p><p> pensando nisso há muitos anos, tive essa ideia absurda (que nem é novidade), idiota e provavelmente fracassada: tentar na força bruta! </p><p> apesar de meio burro, eu não sou doido. minha ideia é tentar na medida do possível, sem me cobrar demais, fazer aos poucos o que eu achar que faz sentido.</p><p>vou tentar de maneira bem objetiva, usar o que aprendi pra ver se consigo desenvolver algo que vale a pena. </p><p>se é que eu aprendi alguma coisa: já comecei no negativo! gastei $50 pra comprar esse domínio 😅</p><p>de 99, pelo menos 1 deve vingar. esse é o meu plano.</p>`,
    headline: "de 99, pelo menos 1 deve vingar. esse é o meu plano.",
    headJumbo: "uma ideia idiota e provavelmente fracassada.",
    "🦆": "cuaqui!",
  },
  [EN_US]: {
    initialText: `<p>what is success, or how many tries is necessary to get it right?</p><p>thinking about it many years ago, I had this absurd (not even new), stupid and probably failed idea: trying brute force!</p><p>although I'm kind of dumb, I'm not crazy. my idea is to try the best I can, without overwhelming myself, doing little by little what I think makes sense.</p><p>I'm going to try very objectively, use what I've learned to see if I can develop any worth thing. </p><p>as if I learned something: I already started in debt! I spent $50 to buy this domain 😅</p><p>out of 99, at least 1 must succeed. that's my plan.</p>`,
    headline: "out of 99, at least 1 must succeed. that's my plan.",
    headJumbo: "an stupid and probably failed idea.",
    "🦆": "quack!",
  },
};

/**
 * If you're younger than 25 y old maybe you'd never seen this weird dolar sign on a javascript document, but if you have time take a look into [jQuery](https://jquery.com/)
 * @param {string} element selector name
 * @returns selected element node(s)
 */
function $(filter) {
  const elements = document.querySelectorAll(filter);

  return Object.assign(
    {
      elMap: (callback) => {
        if (!callback) throw new Error("callback needed");
        elements.forEach((element) => callback(element));
      },
      addEventListener: (listener, callback) => {
        if (!listener || !callback)
          throw new Error("callback or listener needed");
        this.addEventListener(listener, callback);
      },
    },
    { node: elements }
  );
}

/**
 * https://media.giphy.com/media/ukGm72ZLZvYfS/giphy.gif
 * @param {string} value
 * @returns {boolean} is equack?
 */
$.isEquack = (value) => value === "🦆";

/**
 * map every element that matches with class=i18n.* and change the text with it's the corresponding pair from key=value
 * @param {EN_US|PT_BR} userLanguage user language
 */
$.i18n = function (element, lang) {
  const userLang = sessionStorage.getItem("user-lang");
  const template = i18nTemplate[userLang];

  $(element).elMap((node) => {
    node.innerHTML = $.isEquack(lang)
      ? Math.random() < 0.5
        ? lang
        : template[lang]
      : template[node.dataset.i18n];
  });
};

/**
 * handle the action of switching the user display language
 * triggered by the [data-lang] button
 *
 * @param {HTMLElement} element
 */
function switchLanguage(element) {
  sessionStorage.setItem(
    "user-lang",
    $.isEquack(element.target.value)
      ? sessionStorage.getItem("user-lang")
      : element.target.value
  );
  $.i18n("[data-i18n]", element.target.value);
}

$("body").addEventListener("load", () => {
  sessionStorage.setItem("user-lang", USER_DEFAULT_LANG);

  $("#lang").addEventListener("change", switchLanguage);

  $("option").elMap((node) => {
    node.selected = node.value === USER_DEFAULT_LANG;
  });

  $.i18n("[data-i18n]");
});
