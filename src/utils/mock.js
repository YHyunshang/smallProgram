/*
 * @Description: mock
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-07 23:50:59
 */

/**
 * @description: 相似商品列表
 */
export const similarGoods = [
  {
    productCode: 'NS1000910',
    productName: '甲天下芝麻汤圆200g',
    mainUrl: 'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-07-05|2767859538970288128',
    pictures: '',
    evaluateContext: '很好',
    evaluateScore: 5,
    evaluateTime: 1563515782000,
    promotionPrice: 1234,
    price: 4078,
    deleteStatus: 0,
    createdBy: '',
    totalNum: 1
  },
  {
    productCode: '10038',
    productName: '套袋红富士套袋红富',
    mainUrl: 'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-08-05|8499126593061396480',
    pictures: '',
    evaluateContext: '很好',
    evaluateScore: 5,
    evaluateTime: 1563515782000,
    promotionPrice: 1699,
    price: 2034,
    deleteStatus: 0,
    createdBy: '',
    totalNum: 1
  },
  {
    productCode: 'NS1000908',
    productName: '套袋红富士套袋红富',
    mainUrl: 'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-07-05|2767859538970288128',
    pictures: '',
    evaluateContext: '很好',
    evaluateScore: 5,
    evaluateTime: 1563515782000,
    promotionPrice: 1699,
    price: 2034,
    deleteStatus: 0,
    createdBy: '',
    totalNum: 1
  },
  {
    productCode: 'NS1000909',
    productName: '甲天下芝麻汤圆200g',
    mainUrl: 'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-08-05|8494217475125157888',
    pictures: '',
    evaluateContext: '很好',
    evaluateScore: 5,
    evaluateTime: 1563515782000,
    promotionPrice: '',
    price: 4078,
    deleteStatus: 0,
    createdBy: '',
    totalNum: 1
  }
]

/**
 * @description: 帮助与反馈解答
 */
export const helpFeedBackAnswer = {
  goodsQuestion: [
    {
      questionTitle: '送过来的商品有问题，怎么办？',
      questionContent: '1、签收时请您仔细核对商品，如有质量问题或少/漏/破损等，可向配送员提出拒收或者提出补发/更换商品需求，由骑手反馈门店处理； 2、签收后，如有质量问题或少/漏/破损等，请在24小时内拍照留证，保存问题商品并进入APP【我的】-【全部订单】-【订单详情】-【申请退货】申请售后或联系客服处理。'
    },
    {
      questionTitle: '支付成功后，发现部分商品缺货',
      questionContent: '请不用担心，缺货商品，门店会及时与您联系，确认退款或者更换商品。'
    },
    {
      questionTitle: '我拍错商品了，怎么修改？',
      questionContent: '订单提交后，不能再修改。您可以取消订单后重新下单。'
    }
  ],
  deliveryQuestion: [
    {
      questionTitle: '为什么我定位的地址不能配送？',
      questionContent: '大部分门店的配送范围是3KM内，实际根据交通路线而定'
    },
    {
      questionTitle: '下单完成后，多久能配送到？',
      questionContent: '最快30分钟送达，您可以在提交订单时自行预约时间。'
    },
    {
      questionTitle: '配送单收费情况是？',
      questionContent: '实付不满配送门槛，收取3元配送费，超过则立享配送优惠；不同区域/商家之间规则会略有不同，具体可查看订单内配送费详情说明。'
    },
    {
      questionTitle: '已超出预约的配送时间，我怎么还没收到商品？',
      questionContent: '节假日或活劢期间订单量较大，我们的配送小哥会加急为您配送，如有延迟，请耐心等待，给您带来不便我们表示抱歉。'
    },
    {
      questionTitle: '送货地址可以修改吗？',
      questionContent: '点击APP首页会员中心--地址管理--点“+新建地址“。'
    },
    {
      questionTitle: '可以预约多久时间内的配送',
      questionContent: '因受商品保存期限和价格波动影响，目前仅支持预约下单24小时内的时间配送（预售商品见页面具体告知）。特价清仓商品仅支持预约下单2小时内的配送。如您因故需要临时修改配送时间，修改后的时间也需在以上说明的时间范围内。'
    }
  ],
  orderQuestion: [
    {
      questionTitle: '提交订单后，订单信息(地址/联系电话)或商品信息可以修改吗？',
      questionContent: '订单提交后，不能再修改。您可以取消订单后重新下单。'
    }
  ],
  memberQuestion: [
    {
      questionTitle: '积分如何获得？',
      questionContent: '购物得积分，每消费1元可得1积分。'
    },
    {
      questionTitle: '积分如何使用？',
      questionContent: '积分可以当现金抵扣，每500积分可抵扣1元，积分最多抵扣订单总额20%。'
    },
    {
      questionTitle: '取消订单或者退货、退款，使用掉的优惠券能否返还？',
      questionContent: '整单退款或退货，优惠券自动原路退回，有效期跟原优惠券有效期一样，部分退款或者退货，系统不退回优惠券。'
    },
    {
      questionTitle: '发生了退货退款，积分如何退还？',
      questionContent: '发生退货退款时，已使用的积分将按比例退还。'
    }
  ],
  invoiceQuestion: [
    {
      questionTitle: '如何开发票',
      questionContent: '若您下单时忘记开具电子发票，30天内订单，可扫描订单小票的开票二维码进行开票或可下载APP，点击“我的-全部订单”中找到需要开具发票的订单，选择“补开发票”；超过30天的订单开票请联系客服咨询。'
    },
    {
      questionTitle: '发票类型和发票内容是什么？',
      questionContent: '您好，我们开具的是全国统一的增值税普通发票，为电子发票；发票内容为商品明细。'
    },
    {
      questionTitle: '为什么电子发票的金额，比订单金额小？',
      questionContent: '发票开具的金额，按照您订单实际支付金额（第三方支付部分）开具，不含优惠券，积分、账户余额、免邮机会等。'
    },
    {
      questionTitle: '多个订单能否合并开一张发票',
      questionContent: '您好，您可将需要合并开票的订单号及开票信息提供给客服，由客服帮您开具。'
    },
    {
      questionTitle: '没收到开的电子发票，怎么办？',
      questionContent: 'APP“我的-全部订单”中找到订单，可查看发票开具进程，如超过3个工作日还未开具成功，请联系客服为您解决'
    },
    {
      questionTitle: '申请了退货退款，已经开的发票怎么处理',
      questionContent: '发生整单退货退款时，已开具的发票将失效；发生部分退货退款时，系统将根据退货后的有效商品金额自动重新开具新的发票，原发票失效。'
    },
    {
      questionTitle: '开票信息填写错了，怎么办？',
      questionContent: '若发票信息填写错误，您可联系客服为您修改。'
    }
  ],
  refundQuestion: [
    {
      questionTitle: '什么情况下可以享受售后服务',
      questionContent: '1、 当您购买的商品发生质量问题、商品错发/漏发、商品破损、过期、描述不符等问题，可以在24小时内提出退换货申请。 2、 参加限时抢购、换购、特价促销（清仓)的商品出现质量问题时因商品特性仅支持退货退款，暂不支持换货。 3、 因客户保管储藏不当、人为操作不当导致商品无法食用/使用时，不支持退换货。 4、 对支持七天无理由退换货并符合完好标准的商品，可发起七天无理由退换货申请。'
    },
    {
      questionTitle: '什么时候可以提出退换货申请',
      questionContent: '1、 支持7天无理由退换货的商品应在收到商品之日起7天内提出退换货申请（自系统显示签收商品的次日零时起计算，满168小时为七天）。 2、 不支持7天无理由退换货的商品发生质量问题或错漏发时应在收到商品之时起24小时内提出退换货申请。 3、 实行国家“三包”政策的商品如出现国家法律规定的功能性障碍或质量问题，支持在收到商品之日起15天内提出换货申请。 4、 超出以上规定的时间提出的退换货申请将无法处理。'
    },
    {
      questionTitle: ' 7天无理由退货的商品范围',
      questionContent: '支持7天无理由退货的商品，客户可以在收到商品七日内申请退货，且无需说明理由，但下列商品除外： 1、定制类商品：如个性定制、设计服务； 2、鲜活易腐类商品:如鲜花绿植、新鲜蔬果、烘焙熟食、鲜奶、禽肉禽蛋、海鲜水产、冷藏食品、冷冻食品、水产肉类加工品、宠物等； 3、在线下载或者激活的数字化商品:如电子券包  4、一经激活或者试用后价值贬损较大的商品，或非生活消费所需的商品：如智能设备、商用厨具、内裤、短袜/打底袜/丝袜/美腿袜、塑身裤、塑身连体衣、乳贴、插片/胸垫等  5、拆封后影响人身安全或者生命健康的商品，或者拆封后易导致商品品质发生改变的商品：如食品、保健品、贴身用品等；客户7天无理由退货的商品应当包装完好、配件齐全，塑封商品未拆封，和客户另有约定的，按照约定执行。'
    },
    {
      questionTitle: '商品不想要了，怎么退款退货',
      questionContent: '生鲜商品具有新鲜度、易腐性等特征，目前不支持无理由退换货； 1、若订单状态是“备货中”，可在订单详情选择“退款”，已支付的款项和优惠券将在1-3个工作日内原路返回到原支付账户中  2、如果订单状态是“已配送”，可联系配送员提出拒收，门店会在收到您退回的商品后及时为您审批，通过后即可收到退款  3、若您收到的商品有质量问题，请您在签收后24小时内拍照留证、保存商品并进入APP【我的】-【全部订单】-【订单详情】-【申请退货】申请售后，门店将在1个工作日内进行处理，审核通过后，款项将在1-3个工作日原路退回。'
    },
    {
      questionTitle: '申请退货了，赠品和换购的商品怎么办？',
      questionContent: '若您购买的商品有赠品或换购商品，办理退货时，须同时将赠品/换购商品全部退回。赠品/换购商品若有遗失或破损不影响商品退货，但退款时需扣除相应遗失/破损商品的商品金额。'
    },
    {
      questionTitle: '申请了7天无理由退货，已经付的运费可以退回吗',
      questionContent: '发生7天无理由退货时，已支付的配送费将无法退回，订单/商品退款金额需扣除相应的配送运费。'
    },
    {
      questionTitle: '怎么知道是否已经退款？',
      questionContent: 'APP“我的-退款中”找到退款订单，如果订单状态为“订单已退款”即已经退款。'
    }
  ]
}
