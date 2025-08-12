import React from 'react';
import { useTheme } from '../../components/theme/ThemeProvider';

const ZhAboutPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.colors.background} py-16 px-4`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-8 ${theme.colors.textPrimary}`}>
          关于今日星座运势
        </h1>
        
        <div className={`prose prose-lg mx-auto ${theme.colors.textSecondary}`}>
          <p className="text-xl leading-relaxed mb-6">
            欢迎来到今日星座运势，您值得信赖的精准占星指导平台。我们为十二星座提供每日运势解读，
            帮助您应对生活中的挑战和机遇。
          </p>
          
          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${theme.colors.textPrimary}`}>
            我们的使命
          </h2>
          <p className="mb-6">
            我们的使命是让占星学变得易于理解且富有意义。我们相信了解您的星座可以为您的
            性格、人际关系和人生道路提供宝贵的洞察。
          </p>
          
          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${theme.colors.textPrimary}`}>
            我们提供的服务
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>十二星座每日运势解读</li>
            <li>详细的性格分析</li>
            <li>爱情和关系配对</li>
            <li>事业和财运指导</li>
            <li>月度和年度预测</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ZhAboutPage;