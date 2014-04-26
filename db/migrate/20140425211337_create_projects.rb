class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.text :infos
      t.text :tags
      t.string :url
      t.attachment :cover

      t.timestamps
    end
  end
end
