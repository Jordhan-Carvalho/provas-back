const Joi = require("joi");

const semesterRegex = /[0-9]{4}.[0-2]/;

const testSchema = Joi.object({
  semester: Joi.string().pattern(semesterRegex).required().messages({
    "string.pattern.base": "Formato inválido",
  }),
  category_id: Joi.number().required(),
  class_id: Joi.number().required(),
  professor_id: Joi.number().required(),
  test_url: Joi.string().uri().required(),
});

module.exports = {
  testSchema,
};
