class Project < ActiveRecord::Base
    validates :title, presence: true
    validates :url, presence: true
    has_attached_file :cover, :styles => { :medium => "400x200>" }, :default_url => ''
    validates_attachment_content_type :cover, :content_type => /\Aimage\/.*\Z/
end
