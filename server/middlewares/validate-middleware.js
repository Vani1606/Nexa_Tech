const validate = (schema) => async(req, res, next) => {
  try {
    // Directly assign the request body to parsedBody for further use
    //const parsedBody =await schema.parseAsync(req.body);
    const parsedBody =req.body;
    req.body = parsedBody; // Assign the validated and parsed body back to the request object
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors && err.errors.length > 0 ? err.errors[0].message : err.message;

    const error = {
      status,
      message,
      extraDetails,
    };

    console.log("Validation error:", error, "Original error:", err);
    res.status(status).json(error);
  }
};

module.exports = validate;