module("中国地区选择 三级联动菜单");

test("扩展数据正常加载", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
	});
	deepEqual(a.data.length, 3512, "数据为 3512条");
});

test("通过code/name查找详细数据", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3')
	});
	var ss = a.find('哈尔滨市');
	var ss1 = a.find('230100');
	var ss2 = {
		"code": "230100",
		"name": "哈尔滨市",
		"pCode": "230000"
	};
	deepEqual(ss, ss1, "二种结果相同 a.find('哈尔滨市') === a.find('230100')");
	deepEqual(ss, ss2, "查找结果与预期相同");
});

test("通过code/name查找 下级数据", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
	});
	var ss = a.findNextData('黑龙江省');
	var expected = [{
		"code": "230100",
		"name": "哈尔滨市",
		"pCode": "230000"
	}, {
		"code": "230200",
		"name": "齐齐哈尔市",
		"pCode": "230000"
	}, {
		"code": "230300",
		"name": "鸡西市",
		"pCode": "230000"
	}, {
		"code": "230400",
		"name": "鹤岗市",
		"pCode": "230000"
	}, {
		"code": "230500",
		"name": "双鸭山市",
		"pCode": "230000"
	}, {
		"code": "230600",
		"name": "大庆市",
		"pCode": "230000"
	}, {
		"code": "230700",
		"name": "伊春市",
		"pCode": "230000"
	}, {
		"code": "230800",
		"name": "佳木斯市",
		"pCode": "230000"
	}, {
		"code": "230900",
		"name": "七台河市",
		"pCode": "230000"
	}, {
		"code": "231000",
		"name": "牡丹江市",
		"pCode": "230000"
	}, {
		"code": "231100",
		"name": "黑河市",
		"pCode": "230000"
	}, {
		"code": "231200",
		"name": "绥化市",
		"pCode": "230000"
	}, {
		"code": "232700",
		"name": "大兴安岭地区",
		"pCode": "230000"
	}];
	deepEqual(ss, expected, "a.findNextData('黑龙江省')");
});

test("事件绑定", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3')
	});
	a.s1.val('黑龙江省').trigger('change');
	var ss = a.s2.find('option').eq(0).text();
	deepEqual(ss, '哈尔滨市', "s1.val('黑龙江省').trigger('change')");
});

test("设置初始数据初始数据", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
		def: ['黑龙江省', '哈尔滨市', '道里区']
	});
	var d = {
		s1: $('#s1').val(),
		s2: $('#s2').val(),
		s3: $('#s3').val()
	};
	var d2 = {
		s1: "黑龙江省",
		s2: "哈尔滨市",
		s3: "道里区"
	};
	deepEqual(d, d2, "{def: ['黑龙江省', '哈尔滨市', '道里区']}");
});

test("补充数据", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
		def: ['哈尔滨市']
	});
	deepEqual(a.format(['哈尔滨市']), [{
		"code": "86",
		"name": "中国",
		"pCode": "root"
	}, {
		"code": "230000",
		"name": "黑龙江省",
		"pCode": "86"
	}, {
		"code": "230100",
		"name": "哈尔滨市",
		"pCode": "230000"
	}], "format(['哈尔滨市'])");
});


test("设置初始数据初始数据2", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
		def: ['黑龙江省', '哈尔滨市']
	});
	var d = {
		s1: $('#s1').val(),
		s2: $('#s2').val(),
		s3: $('#s3').val()
	};
	var d2 = {
		s1: "黑龙江省",
		s2: "哈尔滨市",
		s3: "市辖区"
	};
	deepEqual(d, d2, "初始数据 {def: ['黑龙江省', '哈尔滨市']}");
});


test("使用[市]设置初始数据", function() {
	var a = new Area({
		s1: $('#s1'),
		s2: $('#s2'),
		s3: $('#s3'),
		def: ['哈尔滨市']
	});
	var d = {
		s1: $('#s1').val(),
		s2: $('#s2').val(),
		s3: $('#s3').val()
	};
	var d2 = {
		s1: "黑龙江省",
		s2: "哈尔滨市",
		s3: "市辖区"
	};
	deepEqual(d, d2, "使用[市]设置初始数据 {def: ['哈尔滨市']}");
});

test("使用code做为选项的值", function() {
	var a = new Area({
		s1: $('#s21'),
		s2: $('#s22'),
		s3: $('#s23'),
		def: ['哈尔滨市'],
		valueType:"code"
	});
	var d = {
		s21: $('#s21').val(),
		s22: $('#s22').val()
	};
	var d2 = {
		s21: "230000",
		s22: "230100"
	};
	deepEqual(d, d2, '使用code做为选项的值{valueType:"code"}');
});