const carLength = [
  { label: '11米', value: 8 },
  { label: '13米', value: 2 },
  { label: '15米', value: 9 },
  { label: '17.5米', value: 3 },
  { label: '22米', value: 10 },
  { label: '4.2米', value: 4 },
  { label: '5.2米', value: 5 },
  { label: '6.8米', value: 6 },
  { label: '7.6米', value: 7 },
  { label: '9.6米', value: 1 },
  { label: '其他', value: 0 },
];

// 其他值应该为0，但是组件本身bug，不支持这种表达方式，所以特意将其他的值设置为100
// 个人信息 － 车长车型编辑
// 注册 － 车长车型选择
const carType = [
  { label: '低栏车', value: 10, children: carLength },
  { label: '其他', value: 100, children: carLength },
  { label: '冷藏车', value: 8, children: carLength },
  { label: '半箱式', value: 6, children: carLength },
  { label: '平板车', value: 1, children: carLength },
  { label: '特型车', value: 9, children: carLength },
  { label: '箱式车', value: 7, children: carLength },
  { label: '高栏车(无要求)', value: 11, children: carLength },
  { label: '高栏车(立柱可拆)', value: 13, children: carLength },
  { label: '高栏车(高栏/立柱可拆)', value: 14, children: carLength },
  { label: '高栏车(高栏可拆)', value: 12, children: carLength },
];

const tags = [
  { name: '京' },
  { name: '津' },
  { name: '浙' },
  { name: '川' },
  { name: 'x' },
  { name: 'a' },
  { name: 'b' },
  { name: 'd' },
  { name: 'e' },
  { name: 'r' },
  { name: 'p' },
  { name: 'o' },
  { name: 'i' },
  { name: 'u' },
  { name: 'y' },
  { name: 'h' },
  { name: 'j' },
  { name: 'k' },
  { name: 'l' },
  { name: ';' },
];

export default {
  carLength,
  carType,
  tags,
};
