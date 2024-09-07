const repos = [
  {
    id: 1,
    name: "聚宝盆100W",
    deliveryPrice: "14.48",
    sku: "TYNJBPBD1",
    description: "聚宝盆",
  },
  {
    id: 2,
    name: "聚宝盆200W",
    deliveryPrice: "19.44",
    sku: "TYNJBPBD2",
    description: "聚宝盆",
  },
  {
    id: 3,
    name: "聚宝盆400W",
    deliveryPrice: "30.04",
    sku: "TYNJBPBD3",
    description: "聚宝盆",
  },
  {
    id: 4,
    name: "聚宝盆600W",
    deliveryPrice: "39.99",
    sku: "TYNJBPBD4",
    description: "聚宝盆",
  },
];

export function getRepos(params) {
  // If no params are provided, return all repos
  if (params === undefined) {
    return {
      data: repos,
      success: true,
    };
  }

  // Create a copy of the repos array for filtering
  let filteredRepos = [...repos];

  // Filter by SKU if provided
  if (params.sku) {
    const skuRegex = new RegExp(params.sku, "i");
    filteredRepos = filteredRepos.filter((repo) => skuRegex.test(repo.sku));
  }

  // Filter by name if provided
  if (params.name) {
    const nameRegex = new RegExp(params.name, "i");
    filteredRepos = filteredRepos.filter((repo) => nameRegex.test(repo.name));
  }

  // Return the filtered repos
  return {
    data: filteredRepos,
    success: true,
  };
}
