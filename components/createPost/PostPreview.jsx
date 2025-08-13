
import { Wand2, Hash, X } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from '../ui/button';

export default function PostPreview({ postContent, imageDimensions,onClose }) {
  return (
    <div className="w-1/2 border-r p-6 overflow-y-auto">
      <div className="sticky top-0 bg-white pb-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Post Preview</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                      </Button>
        </div>
    
        <Separator />
      </div>
      
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        {/* Caption */}
        {postContent.text && (
          <div className="mb-4">
            <p className="whitespace-pre-line">{postContent.text}</p>
          </div>
        )}

        {/* Hashtags */}
        {(postContent.hashtags.length > 0 || postContent.customHashtags.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {postContent.hashtags.map((tag, i) => (
              <span key={`ai-${i}`} className="text-blue-500 text-sm">{tag}</span>
            ))}
            {postContent.customHashtags.map((tag, i) => (
              <span key={`custom-${i}`} className="text-blue-500 text-sm">{tag}</span>
            ))}
          </div>
        )}
        
        {/* Media */}
        {postContent.images.length > 0 || postContent.video ? (
          <div className="rounded-lg overflow-hidden flex justify-center items-center">
            {postContent.images.length > 0 && (
              <img
                src={postContent.images[postContent.images.length - 1].url}
                alt="Post preview"
                className="max-w-full bg-white shadow-2xl max-h-96 object-contain"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  aspectRatio: imageDimensions.width > 0 
                    ? `${imageDimensions.width}/${imageDimensions.height}`
                    : '1/1'
                }}
              />
            )}
            {postContent.video && (
              <video
                src={postContent.video}
                controls
                className="w-full h-auto max-h-96"
              />
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400">
            <p>No media uploaded yet</p>
          </div>
        )}

      

        {/* AI Features Badge */}
        <div className="flex gap-2 mt-4">
          {postContent.text.includes('#BetterWithAI') && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Wand2 className="w-3 h-3" />
              AI Enhanced
            </Badge>
          )}
          {postContent.hashtags.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              AI Hashtags
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}