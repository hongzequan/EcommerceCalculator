const repos = [
  {
    id: 1,
    name: '聚宝盆100W',
    deliveryPrice:'14.48',
    sku:'TYNJBPBD1',
    description: '聚宝盆',
  },
  {
    id: 2,
    name: '聚宝盆200W',
    deliveryPrice:'19.44',
    sku:'TYNJBPBD2',
    description: '聚宝盆',
  },
  {
    id: 3,
    name: '聚宝盆400W',
    deliveryPrice:'30.04',
    sku:'TYNJBPBD3',
    description: '聚宝盆',
  },
  {
    id: 4,
    name: '聚宝盆600W',
    deliveryPrice:'39.99',
    sku:'TYNJBPBD4',
    description: '聚宝盆',
  },
];

export function getRepos() {
  // return await request.get('/repos');
  // console.log(params);
  return {
    data: repos,
    page: 1,
    success: true,
    total: 10,
  };
}
