export class EnricherPattern {
  #ID = /[a-zA-Z0-9]+/;
  #TEXT = /[\S\s]+/;
  #WORD = /\S+/;
  #SIZE = /(?:big|bigger|medium|smaller|small)/
  #SEPARATOR = /(?:\;\s+)/;

  #ready = false;
  names = [];
  references = {
    //[]
    type: undefined,
    amount: undefined,
    optional: undefined,
  };
  configurations = {
    //()
    type: undefined,
    amount: undefined,
    optional: undefined,
  };
  labels = {
    //{}
    type: undefined,
    amount: undefined,
    optional: undefined,
  };

  getRegex() {
    if (!this.#ready) throw "Pattern is not ready to be built.";

    var regexSource = "@";

    // Names
    regexSource += `(?:${this.names[0]}`;
    for (let i = 1; i < this.names.length; i++) {
      regexSource += `|${this.names[i]}`;
    }
    regexSource += `)`;

    // References
    if (this.references.type !== undefined) {
      regexSource += `(?:\\[(${this.references.type.source}`;
      if (this.references.amount === "SINGLE") regexSource += `)\\])`;
      else if (this.references.amount === "MULTIPLE")
        regexSource += `(?:${this.#SEPARATOR.source}${this.references.type.source})*)\\])`;
      if (this.references.optional) regexSource += `?`;
    }
    
    // Configurations
    if (this.configurations.type !== undefined) {
      regexSource += `(?:\\((${this.configurations.type.source}`;
      if (this.configurations.amount === "SINGLE") regexSource += `)\\))`;
      else if (this.configurations.amount === "MULTIPLE")
        regexSource += `(?:${this.#SEPARATOR.source}${this.configurations.type.source})*)\\))`;
      if (this.configurations.optional) regexSource += `?`;
    }

    
    // Labels
    if (this.labels.type !== undefined) {
      regexSource += `(?:\\{(${this.labels.type.source}`;
      if (this.labels.amount === "SINGLE") regexSource += `)\\})`;
      else if (this.labels.amount === "MULTIPLE")
        regexSource += `(?:${this.#SEPARATOR.source}${this.labels.type.source})*)\\})`;
      if (this.labels.optional) regexSource += `?`;
    }

    return new RegExp(regexSource, "g")
  }

  /**
   * Adds a name to the pattern.
   * @param {string} name
   * @returns builder for chaining of method calls.
   */
  addName(name) {
    this.names.push(name);
    this.#ready = true;

    return this;
  }

  /**
   * Sets types of references for pattern.
   * @param {string} type the type of the string. Should be either "ID", "TEXT", "SIZE"
   * @param {string} amount the amount of desired occurances. Should be either "SINGLE", "MULTIPLE"
   * @param {boolean} optional Sets if the field is optional.
   * @returns builder for chaining of method calls.
   */
  setReferenceTypes(type, amount, optional) {
    return this.#setField(type, amount, optional, this.references);
  }

  /**
   * Sets types of labels for pattern.
   * @param {string} type the type of the string. Should be either "ID", "TEXT", "SIZE"
   * @param {string} amount the amount of desired occurances. Should be either "SINGLE", "MULTIPLE"
   * @param {boolean} optional Sets if the field is optional.
   * @returns builder for chaining of method calls.
   */
  setLabelTypes(type, amount, optional) {
    return this.#setField(type, amount, optional, this.labels);
  }

  /**
   * Sets types of configurations for pattern.
   * @param {string} type the type of the string. Should be either "ID", "TEXT", "SIZE"
   * @param {string} amount the amount of desired occurances. Should be either "SINGLE", "MULTIPLE"
   * @param {boolean} optional Sets if the field is optional.
   * @returns builder for chaining of method calls.
   */
  setConfigTypes(type, amount, optional) {
    return this.#setField(type, amount, optional, this.configurations);
  }

  /**
   * Sets field of the pattern.
   * @param {string} type Sets the pattern. Should be either "ID", "TEXT", "SIZE"
   * @param {string} amount Sets the amount. Should be either "SINGLE", "MULTIPLE"
   * @param {boolean} optional Sets if the field is optional.
   * @param field Defines the field to be changed.
   */
  #setField(type, amount, optional, field) {
    var types = ["ID", "TEXT", "SIZE"];
    var amounts = ["SINGLE", "MULTIPLE"];
    this.#ready = false;

    switch (type) {
      case "ID":
        field.type = this.#ID;
        break;
      case "TEXT":
        field.type = this.#TEXT;
        break;
      case "SIZE":
        field.type = this.#SIZE;
        break;
      default:
        throw `"${type} is not a valid type. Should be: ${types.join(", ")}"`;
    }

    if (amounts.includes(amount)) {
      field.amount = amount;
    } else {
      throw `"${amount} is not a valid amount. Should be: ${amounts.join(
        ", "
      )}"`;
    }

    field.optional = optional;

    this.#ready = true;
    return this;
  }
}
