exports.topFiveCheap = (req, res, next) => {
  (req.query.sort = '-price'),
    (req.query.page = 1),
    (req.query.limit = 5),
    next();
};
