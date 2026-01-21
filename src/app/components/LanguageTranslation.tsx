import { Languages, Globe2, ArrowRightLeft, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { useState } from 'react';
import { Badge } from '@/app/components/ui/badge';

interface LanguageTranslationProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
];

export function LanguageTranslation({ currentLanguage, onLanguageChange }: LanguageTranslationProps) {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  const handleTranslate = () => {
    if (!sourceText.trim()) return;

    // Mock translation - in real app, would call translation API
    const translations: Record<string, Record<string, string>> = {
      'Hello, how are you?': {
        es: '¡Hola! ¿Cómo estás?',
        fr: 'Bonjour, comment allez-vous?',
        de: 'Hallo, wie geht es dir?',
        zh: '你好，你好吗？',
        ja: 'こんにちは、お元気ですか？',
        ar: 'مرحبا كيف حالك؟',
        hi: 'नमस्ते, आप कैसे हैं?',
      },
    };

    const translated = translations[sourceText]?.[targetLang] || 
      `[${targetLang.toUpperCase()}] ${sourceText}`;
    setTranslatedText(translated);
  };

  const currentLangObj = languages.find(l => l.code === currentLanguage);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-500" />
            Language & Translation
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {currentLangObj?.flag} {currentLangObj?.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current AI Language */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <label className="text-sm font-medium mb-2 block">AI Assistant Language</label>
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-600 mt-2">
            AI will speak and respond in {currentLangObj?.name}
          </p>
        </div>

        {/* Translation Tool */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" />
            Quick Translator
          </h4>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={3}
            className="mb-2"
          />

          <Button onClick={handleTranslate} className="w-full mb-3">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Translate
          </Button>

          {translatedText && (
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Translation</span>
                <Button variant="ghost" size="sm">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm">{translatedText}</p>
            </div>
          )}
        </div>

        {/* Auto-translate messages */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Globe2 className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-yellow-800">Auto-Translation Active</p>
              <p className="text-xs text-yellow-700 mt-1">
                All incoming messages will be automatically translated to {currentLangObj?.name}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
