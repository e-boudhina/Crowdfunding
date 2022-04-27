module.exports = paginationPipeline = ({
  page = "1",
  filter = {},
  pageLimit,
}) => {
  const limit = Number(pageLimit) || 10;
  const skip = (Number(page) - 1) * limit;

  return [
    {
      $match: filter,
    },
    {
      $facet: {
        total: [{$count: "count"}],
        data: [
          {
            $addFields: {_id: "$_id"},
          },
        ],
      },
    },
    {$unwind: "$total"},
    {
      $project: {
        items: {
          $slice: ["$data", skip, {$ifNull: [limit, "$total.count"]}],
        },
        page: {
          $literal: skip / limit + 1,
        },
        hasNextPage: {
          $lt: [{$multiply: [limit, Number(page)]}, "$total.count"],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", limit],
          },
        },
        totalItems: "$total.count",
      },
    },
  ];
};
