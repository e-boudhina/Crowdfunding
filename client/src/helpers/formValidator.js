import { isAfter, format, isEqual, isBefore, isDate, isValid } from "date-fns";
const messages = {
  accepted: `Le champ doit être accepté.`,
  after_day: `Le champ doit être après :date.`,
  before_day: `Le champ doit être avant :date.`,
  after: `Le champ doit être après :date.`,
  after_or_equal: `Le champ doit correspondre ou bien être après :date.`,
  alpha: `Le champ ne peut contenir que des lettres.`,
  alpha_space: `Le champ ne peut contenir que des lettres et des espaces.`,
  alpha_num: `Le champ ne peut contenir que des lettres et des chiffres.`,
  alpha_num_space: `Le champ ne peut contenir que des lettres, chiffres, et espaces.`,
  alpha_num_dash: `Le champ ne peut contenir que des lettres, chiffres, et tirets.`,
  alpha_num_dash_space: `Le champ ne peut contenir que des lettres, chiffres, tirets, et espaces.`,
  array: `Le champ doit êttre un tableau.`,
  before: `Le champ doit être avant :date.`,
  before_or_equal: `Le champ doit correspondre ou bien être avant  :date.`,
  between: `Le champ doit être entre :min et :max.`,
  boolean: `Le champ doit être booléen.`,
  card_exp: `Le champ doit être une date d'expiration valide.`,
  card_num: `Le champ doit être un numéro valide de carte de crédit .`,
  currency: `Le champ doit être une devise valide.`,
  date: `Le champ doit être une date.`,
  date_equals: `Le champ doit correspondre à :date.`,
  email: `Le champ doit êre une adresse email valide.`,
  in: `Le champ selectionné doit être :values.`,
  integer: `Le champ doit être un entier.`,
  max: `Le champ ne doit pas dépasser :max.`,
  min: `Le champ doit au moins être :min.`,
  not_in: `Le champ selectionné ne doit pas être :values.`,
  not_regex: `Le champ ne doit pas correspondre au motif requis.`,
  numeric: `Le champ doit être un chiffre.`,
  phone: `Le champ doit être un numéro de téléphone valide.`,
  regex: `Le champ doit correspondre au motif requis.`,
  required: `Le champ est requis.`,
  size: `Le champ doit être :size.`,
  string: `Le champ doit être une chaîne.`,
  typeof: `Le champ n'est pas le type correcte de .`,
  url: `Le champ doit être un url.`,
  passwordConfirm: "Veuillez entrer le même mot de passe",
};
const testRegex = (value, regex) =>
  value === "" || (value && value.toString().match(regex) !== null);
const toSentence = (arr) => {
  const lastWord = arr[arr.length - 1];

  arr.pop();
  const res = arr.join(", ");

  return `${res} ou ${lastWord}`;
};

const Validators = (params) => {
  let validators = {};

  params.forEach((o) => {
    const { validation } = o;

    switch (validation) {
      case "after":
      case "after_or_equal":
      case "before":
      case "before_or_equal":
      case "after_day":
      case "before_day":
        if (o.date)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.date),
          };
        break;
      case "between":
        if (o.betweenParams)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.betweenParams),
          };
        break;
      case "in":
        if (o.inStringArray)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.inStringArray),
          };
        break;
      case "max":
      case "maxLength":
        if (o.maxParams)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.maxParams),
          };
        break;
      case "min":
      case "minLength":
        if (o.minParams)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.minParams),
          };
        break;
      case "passwordConfirm":
        if (o.passwordConfirm)
          validators = {
            ...validators,
            [validation]: _Validators[validation](o.passwordConfirm),
          };
        break;
      default:
        validators = {
          ...validators,
          [validation]: _Validators[validation],
        };
        break;
    }
  });

  return { validate: validators };
};

const _Validators = {
  accepted: (val) => (val === true ? undefined : messages.accepted),
  after: (date) => (val) =>
    isAfter(val, date)
      ? undefined
      : messages.after.replace(":date", format(date, "LLL")),
  after_or_equal: (date) => (val) =>
    isAfter(val, date) || isEqual(val, date)
      ? undefined
      : messages.after_or_equal.replace(":date", format(date, "dd/MM/yyyy")),
  alpha: (val) => (testRegex(val, /^[A-Z]*$/i) ? undefined : messages.alpha),
  alpha_space: (val) =>
    testRegex(val, /^[A-Z\s]*$/i) ? undefined : messages.alpha_space,
  alpha_num: (val) =>
    testRegex(val, /^[A-Z0-9]*$/i) ? undefined : messages.alpha_num,
  alpha_num_space: (val) =>
    testRegex(val, /^[A-Z0-9\s]*$/i) ? undefined : messages.alpha_num_space,
  alpha_num_dash: (val) =>
    testRegex(val, /^[A-Z0-9_-]*$/i) ? undefined : messages.alpha_num_dash,
  alpha_num_dash_space: (val) =>
    testRegex(val, /^[A-Z0-9_-\s]*$/i)
      ? undefined
      : messages.alpha_num_dash_space,
  before: (date) => (val) =>
    isBefore(val, date)
      ? undefined
      : messages.before.replace(":date", format(date, "LLL")),
  before_day: (date) => (val) =>
    isBefore(
      new Date(format(date, "yyyy/MM/dd")),
      new Date(format(val, "yyyy/MM/dd"))
    )
      ? undefined
      : messages.before_day.replace(":date", format(date, "dd/MM/yyyy")),
  after_day: (date) => (val) =>
    isAfter(
      new Date(format(date, "yyyy/MM/dd")),
      new Date(format(val, "yyyy/MM/dd"))
    )
      ? undefined
      : messages.after_day.replace(":date", format(date, "dd/MM/yyyy")),
  before_or_equal: (date) => (val) =>
    isBefore(val, date) || isEqual(val, date)
      ? undefined
      : messages.before_or_equal.replace(":date", format(date, "dd/MM/yyyy")),
  between: (betweenParams) => (val) =>
    parseFloat(val.toString()) >= betweenParams[0] &&
    parseFloat(val.toString()) <= betweenParams[1]
      ? undefined
      : messages.between
          .replace(":min", betweenParams[0].toString())
          .replace(":max", betweenParams[1].toString()),
  boolean: (val) =>
    val === false || val === true ? undefined : messages.boolean,
  date: (val) => (isDate(val) && isValid(val) ? undefined : messages.date),
  email: (val) =>
    testRegex(val, /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
      ? undefined
      : messages.email,
  in: (inStringArray) => (val) =>
    inStringArray.indexOf(val) > -1
      ? undefined
      : messages.in.replace(":values", toSentence(inStringArray)),
  integer: (val) => (testRegex(val, /^\d*$/) ? undefined : messages.integer),
  max: (maxParams) => (val) =>
    parseFloat(val.toString()) <= maxParams && parseFloat(val.toString()) >= 0
      ? undefined
      : messages.max.replace(":max", maxParams.toString()),
  min: (minParams) => (val) =>
    val >= parseFloat(minParams.toString()) && parseFloat(val.toString()) >= 0
      ? undefined
      : messages.min.replace(":min", minParams.toString()),
  maxLength: (maxParams) => (val) =>
    val.length <= maxParams
      ? undefined
      : messages.max.replace(":max", maxParams.toString()),
  minLength: (minParams) => (val) =>
    val.length >= minParams
      ? undefined
      : messages.min.replace(":min", minParams.toString()),
  numeric: (val) =>
    !val || testRegex(val, /^(\d+.?\d*)?$/) ? undefined : messages.numeric,
  phone: (val) =>
    testRegex(
      val,
      /^(((\+216){0,1}(\+ 216){0,1}(216){0,1}(00216){0,1}[.\- ]{0,1})([2345978]{1}[0-9]{1}[.\- ]{0,1})([0-9]{3}[.\- ]{0,1})([0-9]{3}))/g
    )
      ? undefined
      : messages.phone,
  required: (val) => {
    if (val instanceof Array)
      return val.length !== 0 ? undefined : messages.required;

    return val ? undefined : messages.required;
  },
  string: (val) =>
    typeof val === typeof "string" ? undefined : messages.string,
  passwordConfirm: (passwordConfirm) => (val) =>
    val === passwordConfirm ? undefined : messages.passwordConfirm,
  url: (val) =>
    testRegex(val, /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i)
      ? undefined
      : messages.url,
};

export default Validators;
