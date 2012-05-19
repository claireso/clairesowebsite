class ChangePublishToProjects < ActiveRecord::Migration
  def change
    change_column :projects, :publish, :boolean, {:default => false}
  end

end
