import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star, Users, Zap, Shield, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import ChatModal from './components/chatModal.jsx';
import './App.css'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // const [time, setTime] = useState("");
  const [msg, setMsg] = useState("加载中...");
  const [modalOpen, setModalOpen] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };
  //点击调取worker后端
  const clickWorker=async()=>{
    console.log('clickWorker');
  fetch('https://guge.chuanzhenhe58.workers.dev/api/hello')
  .then(res => res.json())
  .then(data => {
    console.log('Response from worker:', data);

    setMsg(data.message);
  });

  }
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "高性能",
      description: "采用最新技术栈，确保网站快速响应和优异性能"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "安全可靠",
      description: "企业级安全保障，保护您的数据和用户隐私"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "用户友好",
      description: "直观的用户界面设计，提供卓越的用户体验"
    }
  ];

  const testimonials = [
    {
      name: "张总",
      company: "科技有限公司",
      content: "非常专业的团队，交付的产品超出了我们的期望。",
      rating: 5
    },
    {
      name: "李经理",
      company: "创新企业",
      content: "服务质量一流，项目按时完成，合作愉快。",
      rating: 5
    },
    {
      name: "王女士",
      company: "数字化公司",
      content: "技术实力强，解决方案完美契合我们的需求。",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Guge</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'services', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-blue-600' 
                      : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item === 'home' && 'guge首页'}
                  {item === 'about' && '关于我们'}
                  {item === 'services' && '服务'}
                  {item === 'testimonials' && '客户评价'}
                  {item === 'contact' && '联系我们'}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'services', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left"
                >
                  {item === 'home' && '首页'}
                  {item === 'about' && '关于我们'}
                  {item === 'services' && '服务'}
                  {item === 'testimonials' && '客户评价'}
                  {item === 'contact' && '联系我们'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            创新科技
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              引领未来
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            我们致力于为企业提供最前沿的技术解决方案，助力您的数字化转型之路
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              了解服务
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white/30 hover:border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
            >
              联系我们
            </button>
            <button
              onClick={() => clickWorker()}
              className="border-2 border-white/30 hover:border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
            >
              点击调取worker==展示{msg}
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">关于我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们是一家专注于技术创新的企业，拥有多年的行业经验和专业的技术团队
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  通过创新的技术解决方案，帮助企业实现数字化转型，提高运营效率，创造更大的商业价值。我们相信技术的力量能够改变世界，让生活更美好。
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">成功项目</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                    <div className="text-gray-600">企业客户</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">核心价值观</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-yellow-400" />
                    创新驱动发展
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-yellow-400" />
                    客户至上服务
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-yellow-400" />
                    团队合作共赢
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 mr-3 text-yellow-400" />
                    持续学习进步
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">我们的服务</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              提供全方位的技术解决方案，满足不同企业的个性化需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">定制化解决方案</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                根据您的具体需求，我们提供个性化的技术咨询和解决方案设计
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                免费咨询
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">客户评价</h2>
            <p className="text-xl text-gray-600">听听我们客户的真实反馈</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h2>
            <p className="text-xl text-gray-600">准备开始您的项目了吗？让我们聊聊</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">电话</div>
                    <div className="text-gray-600">+86 400-123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">邮箱</div>
                    <div className="text-gray-600">contact@techcorp.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">地址</div>
                    <div className="text-gray-600">北京市朝阳区科技园区123号</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">发送消息</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">消息</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="请输入您的消息"
                  ></textarea>
                </div>
                <button
                  onClick={() => alert('消息已发送！感谢您的联系。')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  发送消息
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="ml-3 text-xl font-bold">TechCorp</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                专注于技术创新，为企业提供优质的数字化解决方案，助力企业发展。
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors">关于我们</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">服务</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white transition-colors">客户评价</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors">联系我们</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">联系信息</h4>
              <ul className="space-y-2 text-gray-400">
                <li>电话: +86 400-123-4567</li>
                <li>邮箱: contact@techcorp.com</li>
                <li>地址: 北京市朝阳区科技园区</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechCorp. 保留所有权利。</p>
          </div>
        </div>
      </footer>

      {/* 弹窗 */}
      <div>
      {modalOpen && <ChatModal onClose={() => setModalOpen(false)} />}
      <div className="chat-float-button" onClick={() => setModalOpen(true)}>
      AI 对话
      </div>
    </div>
       

    </div>
  );
};

export default App;